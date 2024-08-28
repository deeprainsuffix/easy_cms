const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    entry: {
        index: './engine/CNodeTree/index.ts',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist_client'),
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", '...'],
        alias: {
            "@/components": path.resolve(__dirname, 'components'),
            "@/lib": path.resolve(__dirname, 'lib'),
            "@/engine": path.resolve(__dirname, 'engine'),
            "@/client": path.resolve(__dirname, 'client'),
            "@/server": path.resolve(__dirname, 'server'),
        },
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ },
            // { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'easy_cms',
        }),
        new MonacoWebpackPlugin({
            languages: ['css']
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
    },
};