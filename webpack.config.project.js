const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const cNodeTree_hash = env.cNodeTree_hash || 'noHash';
    return {
        mode: 'development',
        // mode: 'production', // todo 这里必须改成生产
        stats: 'errors-only',
        output: {
            filename: `${cNodeTree_hash}.js`,
            path: path.resolve(__dirname, 'server/landing_project'),
            publicPath: './',
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
                { test: /\.(css)$/, use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader'] },
                // { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'easy_cms',
                filename: `${cNodeTree_hash}.html`,
            }),
            new MiniCssExtractPlugin({
                filename: `${cNodeTree_hash}.css`,
            }),
            new AssetsSendPlugin()
        ],
        // optimization: {
        //     runtimeChunk: 'single',
        //     splitChunks: {
        //         cacheGroups: {
        //             vendor: {
        //                 test: /[\\/]node_modules[\\/]/,
        //                 name: 'vendors',
        //                 chunks: 'all',
        //             },
        //         },
        //     },
        //     usedExports: true,
        // },
    }
};

class AssetsSendPlugin {
    constructor() { }

    apply(compiler) {
        const pluginName = AssetsSendPlugin.name;
        const { webpack } = compiler;
        const { Compilation } = webpack;

        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName,
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                (assets) => {
                    console.log(Object.keys(assets).join(' '));
                }
            );
        });
    }
}