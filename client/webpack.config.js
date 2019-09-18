const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};