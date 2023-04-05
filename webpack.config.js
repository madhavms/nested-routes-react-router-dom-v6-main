const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const dotenv = require('dotenv');
const webpack = require('webpack');

// call dotenv and it will return an Object with a parsed key 
const env = dotenv.config().parsed || {};

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Private-Network": true,
    },
    port: 3004,
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: (element) => {
                window["routing-app-style"] = element;
                var parent = options.target || document.head;

                parent.appendChild(element);
              },
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
        name: "routingApp",
        library: { type: "var", name: "routingApp" },
        filename: "routingRemote.js",
        exposes: {
          "./App": "./src/App.js",
          "./Home": "./src/components/Home.js",
          "./Login": "./src/components/Login.js",
          ".Products": "./src/components/products/Products.js",
          ".AddProduct": "./src/components/products/AddProduct.js",
          ".ProductDisplay": "./src/components/products/ProductDisplay.js",
          ".ListProducts": "./src/components/products/ListProducts.js",
        },
        shared: {
          react: { singleton: true, eager: true },
          "react-dom": { singleton: true, eager: true },
        },        
      }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin(envKeys),
  ],
};
