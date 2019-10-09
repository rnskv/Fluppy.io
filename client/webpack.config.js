const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: "./app/src/index.jsx",
    game: "./game/src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "../production"),
    filename: "js/[name]-[hash].bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "./app/src"),
      app: path.resolve(__dirname, "./app"),
      game: path.resolve(__dirname, "./game"),
      shared: path.resolve(__dirname, '../shared')
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "app/src/index.html")
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "game/resources"),
        to: path.resolve(__dirname, "../production/resources")
      },
    ]),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../production"),
    compress: true,
    historyApiFallback: true,
    port: 9000,
    host: '0.0.0.0'
  }
};
