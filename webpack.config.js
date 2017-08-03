var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./javascripts/game.js",
  output: {
    path: path.join(__dirname, 'javascripts'),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
