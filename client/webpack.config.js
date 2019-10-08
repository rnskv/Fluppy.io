const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./app/src/index.jsx",
    game: "./game/src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "../production"),
    filename: "js/[name]-[hash].bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "./app/src"),
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
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../production"),
    compress: true,
    historyApiFallback: true,
    port: 9000,
    host: '0.0.0.0'
  }
};
