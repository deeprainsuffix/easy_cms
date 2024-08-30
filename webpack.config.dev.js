const webpack = require('webpack');

const { merge } = require('webpack-merge');
const config_base = require('./webpack.config.base');
const config_my = {
    mode: 'development',
    devtool: 'eval',
    devServer: {
        static: './dist_client',
        historyApiFallback: true,
        proxy: [
            {
                context: ['/api', '/landing_project',],
                target: 'http://localhost:3000',
            },
        ],
    },
    module: {
        rules: [
            { test: /\.(css)$/, use: ["style-loader", "css-loader", 'postcss-loader'] },
        ]
    },
    optimization: {
        runtimeChunk: 'single',
    },
};

const config_dev = merge(config_base, config_my);
module.exports = config_dev;