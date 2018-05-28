const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        port: '9001',
        proxy: {
            '/' : 'http://localhost:8090/'
        }
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});