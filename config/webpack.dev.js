var helpers = require('./helpers');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8000/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        sourceMapFilename: '[file].map'
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                loader: 'tslint-loader',
                options: {
                    configFile: 'tslint.json'
                }
            }],
            exclude: /\.(spec|e2e)\.ts$/
        }, {
            test: /\.css$/,
            include: [helpers.root('src', 'app')],
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.scss$/,
            include: [helpers.root('src', 'app')],
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    },

    plugins: [
        //new ExtractTextPlugin('[name].[hash].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});