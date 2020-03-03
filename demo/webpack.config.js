//For resolving file paths
const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //Entry point for the webpack module
    entry: path.resolve(__dirname, 'client/index.js'), 

    //The name of the directory and file webpack will output it's file in 
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                //Convert .jsx files using babel-loader
                test: /\.jsx?/, 
                exclude: /node_modules/, 
                use: {
                      loader: 'babel-loader', 
                      options: {
                          presets: ['@babel/preset-env', '@babel/preset-react'],
                      }
                }
                 
            },
            {
                //Convert .css files using style-loader and css-loader
                test: /\.css$/, 
                use: ['style-loader', 'css-loader']
            },
        ]
    }, 

        
    //Used for running the express server(localhost3000) and the webpack-dev-server(localhost8080) concurrently
    devServer: {
        publicPath: '/build/', 
        proxy: {
            '/': {target: 'http://localhost:3000'}
        }
    },
    //For dynamic mode change from 'developer' to 'production'
    mode: process.env.NODE_ENV
};