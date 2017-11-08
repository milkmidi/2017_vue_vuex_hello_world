/* eslint no-console:0 */
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      // 'babel-runtime/regenerator',
      // 'axios',
      // 'vue-class-component',
      // 'vue-property-decorator',
      // 'vuex-class',
      // 'es6-promise/auto',
      'vue',
      // 'vue-router',
      // 'vuex',
    ],
  },
  output: {
    filename: toFilename('asset/js/[name]'),
    chunkFilename: toFilename('asset/js/[name]'),
    path: path.resolve('dist'),
    publicPath: '',
  },
  devtool: DEV_MODE ? 'inline-source-map' : false,
  resolve: {
    modules: [
      path.resolve('src/component'),
      path.resolve('src/css'),
      path.resolve('src/js'),
      path.resolve('src/asset'),
      path.resolve('node_modules'),
    ],
    alias: {
      '~': path.resolve('src'),
      '@': path.resolve('src/js'),
      img: path.resolve('src/asset/img'),
    },
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
      include: path.resolve('src/js'),
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
    filename: toFilename('asset/css/app', 'css'),
    disable: DEV_MODE,
  }),
  new CopyWebpackPlugin([
    { from: 'asset/copy', to: './' },
  ]),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    minChunks: Infinity,
  }),
  new HtmlWebpackPlugin({
    template: 'html/index.template.pug',
    data: {
      DEV_MODE,
    },
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(DEV_MODE ? 'development' : 'production'),
    },
  }),
  new webpack.NamedModulesPlugin(),
  new CleanWebpackPlugin('./dist'),
  //  http://vue-loader.vuejs.org/en/workflow/production.html
  ...DEV_MODE ? [
    new FriendlyErrorsPlugin(),
  ] : [
    new webpack.HashedModuleIdsPlugin({
      hashDigestLength: 20,
    }),
    /* new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }), */
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
