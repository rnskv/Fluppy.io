const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
          src:  path.resolve(__dirname, './src'),
          shared: path.resolve(__dirname, '../shared')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ],
    },
    plugins: [
        new NodemonPlugin()
    ],
    mode: 'development',
};
