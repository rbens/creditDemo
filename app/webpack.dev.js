const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    devServer: {
        contentBase: common.output.path,
        hot: true,
        port: '9001',
        proxy: {
            '/' : 'http://localhost:8090/'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin()
    ]
});