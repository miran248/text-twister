const fs = require("fs");
const path = require("path");

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rootPath = path.resolve(__dirname, ".");
// const assetsPath = path.resolve(rootPath, "assets");
const sourcePath = path.resolve(rootPath, "src");
const buildPath = path.resolve(rootPath, "build");

const mode = process.env.NODE_ENV || "development";
const devMode = mode !== "production";

module.exports = {
  target: "web",

  mode: mode,
  devtool: devMode && "cheap-module-source-map",

  context: rootPath,

  entry: [
    "babel-polyfill",

    "./src/index.js",
  ],

  devServer: {
    historyApiFallback: true,
  },

  output: {
    path: buildPath,
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: "/",
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
          // {
          //   loader: "echo-loader",
          // },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: path.resolve(rootPath, "cache"),
            },
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/fonts/",
          },
        }],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin([ "build" ], {
      root: rootPath,
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(assetsPath, "**", "*"),
    //     to: buildPath,
    //   },
    // ]),
    new ErrorOverlayPlugin,
    new HtmlWebpackPlugin({
      template: path.resolve(sourcePath, "index.html"),
      filename: "./index.html",
      title: "Text Twist",
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
  ],
};
