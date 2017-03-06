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
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }, {
            /**
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            },
            */
            test: /\.css$/,
            exclude: helpers.root('src', 'app'),
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?sourceMap'
            })
        }, {
            test: /\.scss$/,
            exclude: helpers.root('src', 'app'),
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }, {
            test: /\.(png|jpe?g|gif|ico)$/,
            use: 'file-loader?name=assets/[name].[hash].[ext]'
        }, {
            test: /\.(svg|woff2?|ttf|eot)$/,
            use: 'file-loader?name=assets/[name].[hash].[ext]'
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