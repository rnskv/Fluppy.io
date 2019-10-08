const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
      template: path.join(__dirname, "/src/index.html")
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 25565
  }
};
