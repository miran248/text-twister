const fs = require("fs");
const path = require("path");

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = path.resolve(__dirname, ".");
const assetsPath = path.resolve(rootPath, "assets");
const sourcePath = path.resolve(rootPath, "src");
const buildPath = path.resolve(rootPath, "build");

const mode = process.env.NODE_ENV || "development";
const devMode = mode !== "production";

module.exports = {
  target: "web",

  mode: mode,
  devtool: devMode && "cheap-module-eval-source-map",

  context: rootPath,

  entry: {
    index: "./src/index.js",
  },

  output: {
    path: buildPath,
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
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
              babelrc: false,
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
              ],
              plugins: [
                "@babel/plugin-proposal-function-sent",
                "@babel/plugin-proposal-export-namespace-from",
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-syntax-import-meta",
                [ "@babel/plugin-proposal-class-properties", { loose: true } ],
                "@babel/plugin-proposal-json-strings",
                "@babel/plugin-transform-arrow-functions",
              ],
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
    new CopyWebpackPlugin([
      {
        from: path.resolve(assetsPath, "**", "*"),
        to: buildPath,
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(sourcePath, "index.html"),
      filename: "./index.html",
      title: "Text Twist",
    }),
  ],
};
