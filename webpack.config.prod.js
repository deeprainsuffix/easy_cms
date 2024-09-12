const webpack = require('webpack');

const { merge } = require('webpack-merge');
const config_base = require('./webpack.config.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

class Add_inline_script {
    constructor(options = {}) {
        this.script_text = options.script_text || '';
        this.ref_str = options.ref_str || '<script'; // 默认添加到第一个script之上
        this.attributes = options.attributes || {};
    }

    apply(compiler) {
        compiler.hooks.emit.tap(Add_inline_script.name, (compilation) => {
            const asset_html = compilation.assets['index.html'];
            if (!asset_html) {
                throw '未输出index.html文件';
            }

            if (!this.script_text) {
                return
            }

            let attrs = [];
            for (const [key, value] of Object.entries(this.attributes)) {
                attrs.push(key, '=', value);
            }
            const script = `<script ${attrs.join('')}>\n${this.script_text}\n</script>\n ${this.ref_str}`;
            const source_new = asset_html.source().replace(this.ref_str, script);
            compilation.assets['index.html'] = {
                source: function () {
                    return source_new;
                },
                size: function () {
                    return source_new.length;
                },
            };
        });
    }
}

const config_my = {
    mode: 'production',
    module: {
        rules: [
            { test: /\.(css)$/, use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader'] },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackTagsPlugin({
            scripts: [
                { path: 'https://requirejs.org/docs/release/2.3.7/minified/require.js' },
            ],
            append: false,
            publicPath: false,
        }),
        new Add_inline_script({
            script_text: `import React from "https://esm.sh/react@18.3.1"
            import ReactDOM from "https://esm.sh/react-dom@18.3.1"
            window.React = React;
            window.ReactDOM = ReactDOM;`,
            attributes: { type: 'module' },
        }),
        // new BundleAnalyzerPlugin({
        //     excludeAssets: [/css.worker.js/, /editor.worker.js/],
        // }),
    ],
    externals: {
        'monaco-editor': 'window NO_USE', // 其实是amd模块，这里是保证非生产环境不报错
        'react': 'window React',
        'react-dom': 'window ReactDOM',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        usedExports: true,
    },
};

const config_product = merge(config_my, config_base);
module.exports = config_product;