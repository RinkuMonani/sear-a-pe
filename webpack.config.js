// const { ResolvePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/js/index.js'
    ],
    
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist')

        //file will be output to the path
    },
    //loaders
    //plugins
    devServer:{
        contentBase: './dist'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}