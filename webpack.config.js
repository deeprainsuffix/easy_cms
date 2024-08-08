const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // entry: {
    //     index: './client/index.jsx',
    // },
    entry: {
        index: './engine/CNodeTree/index.ts',
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
        alias: {
            "@/components": path.resolve(__dirname, 'components'),
            "@/lib": path.resolve(__dirname, 'lib'),
            "@/engine": path.resolve(__dirname, 'engine'),
            "@/client": path.resolve(__dirname, 'client'),
        },
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ },
            // { test: /\.(less)$/, use: ["style-loader", "css-loader", 'postcss-loader', "less-loader"] },
            { test: /\.(css)$/, use: ["style-loader", "css-loader", 'postcss-loader'] },
            // { test: /\.(css)$/, use: [MiniCssExtractPlugin.loader, , "css-loader", 'postcss-loader'] },
            { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
        // new MiniCssExtractPlugin(),
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