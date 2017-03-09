var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [
            helpers.root('src'),
            helpers.root('node_modules')
        ]
    },
    module: {
        rules: [{
            test: /\.json$/,
            use: 'json-loader'
        }, {
            test: /\.ts$/,
            use: [{
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: helpers.root('src', 'tsconfig.json')
                }
            }, {
                loader: 'angular2-template-loader'
            }],
            exclude: [/\.(spec|e2e)\.ts$/]
        }, { // https://github.com/webpack-contrib/style-loader/issues/123
            test: /\.css$/,
            use: ['to-string-loader', 'css-loader'],
            exclude: helpers.root('src', 'theme')
        }, { // https://github.com/webpack-contrib/sass-loader
            test: /\.scss$/,
            use: ['to-string-loader', 'css-loader', 'sass-loader'],
            exclude: helpers.root('src', 'theme')
        }, {
            test: /\.html$/,
            use: 'raw-loader',
            exclude: [helpers.root('src/index.html')]
        }, {
            test: /\.ico$/,
            use: 'file-loader?name=assets/icon/[name].[hash].[ext]'
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: 'file-loader?name=assets/imgs/[name].[hash].[ext]'
        }, {
            test: /\.(svg|woff2?|ttf|eot)$/,
            use: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
        }]
    },
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}