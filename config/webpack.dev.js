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
            use: ['style-loader', 'css-loader'],
            include: helpers.root('src', 'styles')
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: helpers.root('src', 'styles')
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