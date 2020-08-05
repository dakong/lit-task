const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const BUILD_DIR = path.join(__dirname, "build");
const INDEX_FILE_PATH = "src/index.html";
const WC_BUNDLES_PATH = "node_modules/@webcomponents/webcomponentsjs/bundles";
const WC_LOADER_PATH =
  "node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js";

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 8080,
  },
  entry: {
    components: "./src/index.js",
  },
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: BUILD_DIR,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-proposal-class-properties",
              ["@babel/proposal-decorators", { decoratorsBeforeExport: true }],
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: path.resolve(__dirname, INDEX_FILE_PATH), to: BUILD_DIR },
      {
        from: path.resolve(__dirname, WC_BUNDLES_PATH),
        to: path.resolve(BUILD_DIR, "bundles"),
      },
      { from: path.resolve(__dirname, WC_LOADER_PATH), to: BUILD_DIR },
    ]),
  ],
};
