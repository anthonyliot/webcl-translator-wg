const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const packageJson = require("./package.json");
const fs = require("fs");

const version = packageJson.version;
console.log(`Package version: ${version}`);

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/index.ts"),
  },
  output: {
    libraryTarget: "window",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),

    new webpack.EnvironmentPlugin({
      PACKAGE_VERSION: version,
    }),
  ],

  // Fail if there are any errors (such as a TypeScript type issue)
  bail: true,
};
