var helpers = require('./helpers');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    // http://webpack.github.io/docs/configuration.html#output-filename
    // http://webpack.github.io/docs/configuration.html#output-chunkfilename
    // http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[id].[chunkhash].chunk.js',
        sourceMapFilename: '[name].[chunkhash].bundle.map'
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader']
            }),
            include: [helpers.root('src', 'theme')]
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                // resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            }),
            include: [helpers.root('src', 'theme')]
        }]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            },
            sourceMap: false
        }),
        // https://github.com/webpack-contrib/extract-text-webpack-plugin
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        })
    ]
});