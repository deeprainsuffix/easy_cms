const webpack = require('webpack');

const { merge } = require('webpack-merge');
const config_base = require('./webpack.config.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

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
        new HtmlWebpackTagsPlugin({
            tags: [
                { type: 'js', path: 'https://requirejs.org/docs/release/2.3.7/minified/require.js' },
            ],
            append: false,
            publicPath: false,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    externals: {
        'monaco-editor': 'window PRODUCTION', // 其实是amd模块，这里是保证非生产环境不报错
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