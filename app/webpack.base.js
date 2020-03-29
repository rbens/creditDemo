const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dir = `dist`;

module.exports = {
    entry: {
        vendor: './vendor.ts',
        app: './app.ts'
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, dir)
    },
    optimization:{
      splitChunks:{
          chunks : 'all'
      }
    },
    plugins: [
        new CleanWebpackPlugin([dir]),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: './service/config/config.json',
                to: './config/config.json',
                toType: 'file'
            },
            {
                from: './service/department/department.json',
                to: './department/department.json',
                toType: 'file'
            },
            {
                from: './public/img/*.png',
                to: '',
                toType: 'dir'
            },
            {
                from: './public/img/favicon.ico',
                to: '',
                toType: 'file'
            }
        ],{})
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    { loader: 'file-loader' }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }]
            },
            {
                test: /\.tsx?$/,
                use:  ['babel-loader','ts-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    }
};		
