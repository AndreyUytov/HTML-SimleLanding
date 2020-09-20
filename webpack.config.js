const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const  cssnano  =  require ( "cssnano" ) ;

module.exports = env => {
  const isProduction = env.production === true;

  return {
    mode: isProduction ? "production" : "development",
    entry: {
      index: './src/index.js',
      catalog: './src/catalog.js',
      card: './src/card.js',
      basket: './src/basket.js',
      loginFavorite: './src/login-favorite.js',
      loginProfile: './src/login-profile.js',
      order: './src/order.js'
    },
    output: {
      path: path.join(__dirname, "dist"),
      publicPath: "/",
      filename: "[name].js",
    },

    devtool: isProduction ? "source-map" : "inline-source-map",

    devServer: {
      contentBase: path.join(__dirname, "dist"),
      watchContentBase: true,
      publicPath: '/',
      openPage: 'login-favorite.html'
    },

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "index.css"
      }),
      new webpack.HotModuleReplacementPlugin()
    ],

    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                reloadAll: true,
                sourceMap: true
              }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [
                  (() => {
                    if (isProduction) {
                      return autoprefixer(), cssnano();
                    } else return autoprefixer();
                  })()
                ],
                sourceMap: true
              }
            },
            {
              loader: "resolve-url-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                publicPath: (url, resourcePath, context) => {
                  return `${context}/dist`
                }
              }
            },
            {
              loader: "pug-loader"
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|svg|webp)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
                publicPath: (url, resourcePath, context) => {
                  return `./${url}`
                }
              }
            }
          ]
        },
      ]
    }

  }
}  