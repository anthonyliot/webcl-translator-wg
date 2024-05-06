const path = require("path");
const merge = require("webpack-merge");

module.exports = merge.smart(require("./webpack.config"), {
  mode: "development",

  output: {
    path: path.resolve(__dirname, "../docs/js"),
    filename: "webcl.js",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "../docs/"),
    },
    devMiddleware: {
      publicPath: "/",
    },
    allowedHosts: "auto",
    port: 8000,
  },

  // Include sourcemaps
  devtool: "inline-source-map",

  // Keep running even if there are errors
  bail: false,
});
