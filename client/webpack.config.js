const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file. ✅
// TODO: Add CSS loaders and babel to webpack.✅

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js', // adding editor.js to dist
      header: './src/js/header.js', // adding header.js to dist
      database: './src/js/database.js' // adding database.js to dist
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ //adding HTML webpack plugin
        template: './index.html',  //using template HTML from client directory
        title: 'Text Editor' // title of the page
      }),
      new InjectManifest({ // adding InjectManifest plugin
        swSrc: './src-sw.js', // Adding service worker from Client directory
        swDest: 'src-sw.js' // Adding Service working destination to dist directory
      }),
      // adding webpackPWA manifest and adding properties to manifest
      new WebpackPwaManifest({
        fingerprint: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'Text Editor',
        description: 'Create, write and edit your text right!',
        background_color: '#376191',
        theme_color: '#CBD1D7',
        start_url: './',
        publicPath: './',
        //bringing in icons from client directory along with all file sizes and joining them,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          }
        ]
      })
    ],

  //brining in CSS loaders and babel-loader for ES6
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          }
        }
      ],
    },
  };
};
