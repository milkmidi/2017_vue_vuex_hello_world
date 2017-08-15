/* eslint no-console:0 */
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV === 'development';
const colorFun = DEV_MODE ? chalk.black.bgYellow : chalk.bgCyan.white;

console.log(colorFun(`DEV_MODE = ${DEV_MODE} , process.env.NODE_ENV = ${process.env.NODE_ENV}`));
const toFilename = (name, ext = 'js') => {
  const units = [name, '.', ext];
  if (!DEV_MODE) {
    const hashStr = (ext === 'css' ? '-[contenthash]' : '-[chunkhash]');
    units.splice(1, 0, hashStr);
  }
  return units.join('');
};

const config = {
  context: path.resolve('src'),
  entry: {
    app: ['./js/app.js'],
    vendor: [
      'es6-promise/auto',
      'vue',
      'vue-router',
      'vuex',
    ],
  },
  output: {
    filename: toFilename('js/[name]'),
    chunkFilename: toFilename('js/[name]'),
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  devtool: DEV_MODE ? 'inline-source-map' : false,
  resolve: {
    modules: [
      path.resolve('src/component'),
      path.resolve('src/css'),
      path.resolve('src/js'),
      path.resolve('src'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js'],
  },
};
config.module = {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        preserveWhitespace: false,
        extractCSS: !DEV_MODE, // easy way, will auto import postcss.config.js
        stylus: 'stylus-loader?paths=src/css',
      },
      include: path.resolve('src/component'),
      exclude: /node_modules/,
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.resolve('src/js'),
      exclude: /node_modules/,
    },
    {
      test: /\.(png|jpg|gif|svg|ico)$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: 'asset/[path][name].[ext]?[hash:8]',
      },
      include: path.resolve('src/img'),
      exclude: /node_modules/,
    },
    {
      test: /\.pug$/,
      loader: 'pug-loader',
      options: {
        pretty: true,
        self: true,
      },
      exclude: /node_modules/,
    },
  ],
};

config.plugins = [
  new ExtractTextPlugin({
    filename: toFilename('css/app', 'css'),
    disable: DEV_MODE,
  }),
  // copy src/copy 下所有檔案，放到 dist 下
  copyWebpackPlugin([
    { from: 'copy', to: './' },
  ]),
  // 產生 html , 並注入script tag app.js?[hash] 
  new HtmlWebpackPlugin({
    template: 'html/index.template.pug',
    data: { // 傳變數給 .pug 
      DEV_MODE,
    },
  }),
  // 注入 script app.js , 並加入 defer 屬性
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(DEV_MODE ? 'development' : 'production'),
    },
  }),
  //  http://vue-loader.vuejs.org/en/workflow/production.html
  ...DEV_MODE ? [
    new FriendlyErrorsPlugin(),
  ] : [
    new CleanWebpackPlugin('./dist'),
    new PrerenderSpaPlugin(
      path.join(__dirname, './dist'),
      ['/', '/about', '/login'] // eslint-disable-line
    ),
  ],
];

config.devServer = {
  hot: true,
  historyApiFallback: true,
  port: 3000,
  noInfo: true,
  stats: {
    colors: true,
    hash: false,
    chunks: false,
    chunkModules: false,
  },
};
module.exports = config;
