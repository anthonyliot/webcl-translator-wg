const path = require("path");
const merge = require("webpack-merge");

module.exports = merge.smart(require("./webpack.config"), {
  mode: "development",

  output: {
    path: path.resolve(__dirname, "../docs/js"),
    filename: "webcl.js",
  },

  // Include sourcemaps
  devtool: "inline-source-map",
});
