const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV;

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'slider.min.js',
    clean: mode === 'production'
  },
  target: ['web', 'es5'],
  devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
  devServer: {
    watchFiles: ["./src/*", "./demo/*"],
    compress: true,
    port: 9000,
    open: true,
    hot: true
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    /*new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "demo/index.html"),
      minify: false
    }),*/
    new MiniCssExtractPlugin({
      filename: 'slider.min.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: "demo", to: "demo" },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js|\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext]"
        }
      },
    ]
  }
};