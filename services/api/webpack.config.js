const fs = require("fs");
const path = require("path");

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");

const rootPath = path.resolve(__dirname, ".");
const sourcePath = path.resolve(rootPath, "src");
const buildPath = path.resolve(rootPath, "build");

const mode = process.env.NODE_ENV || "development";
const devMode = mode !== "production";

module.exports = {
  target: "node",

  mode: mode,
  devtool: devMode && "cheap-module-source-map",

  context: rootPath,

  entry: [
    "babel-polyfill",

    "./src/index.js",
  ],

  output: {
    path: buildPath,
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "echo-loader",
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: path.resolve(rootPath, "cache"),
            },
          }
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin([ "build" ], {
      root: rootPath,
    }),
  ],
};
