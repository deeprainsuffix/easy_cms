const webpack = require('webpack');

const { merge } = require('webpack-merge');
const config_base = require('./webpack.config.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config_my = {
    mode: 'production',
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ },
            { test: /\.(css)$/, use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader'] },
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     PRODUCTION: JSON.stringify(true),
        // }),
        new MiniCssExtractPlugin(),
    ],
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

const config_product = merge(config_base, config_my);
module.exports = config_product;