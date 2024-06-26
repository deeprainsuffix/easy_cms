const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './client/index.jsx',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/assets/',
        clean: true,
    },
    // mode: 'production',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", '...'],
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
        // splitChunks: {
        //     cacheGroups: {
        //         vendor: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'vendors',
        //             chunks: 'all',
        //         },
        //     },
        // },
        // usedExports: true,
    },
};