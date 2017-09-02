/* eslint no-console: 0 */
const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const chalk = require('chalk');

function logDevelopment() {
  const str = `
  ████████  ████████ ██     ██  
  ██     ██ ██       ██     ██  
  ██     ██ ██       ██     ██  
  ██     ██ ██████   ██     ██  
  ██     ██ ██        ██   ██   
  ██     ██ ██         ██ ██    
  ████████  ████████    ███     `;
  console.log(chalk.black.bgYellow(str));
}
function logProduction() {
  const str = `
  ████████  ████████   ███████    
  ██     ██ ██     ██ ██     ██   
  ██     ██ ██     ██ ██     ██   
  ████████  ████████  ██     ██   
  ██        ██   ██   ██     ██   
  ██        ██    ██  ██     ██   
  ██        ██     ██  ███████    `;
  console.log(chalk.bgCyan.white.bold(str));
}

gulp.task('rimraf', cb => rimraf('./dist', cb));


gulp.task('webpack-dev-server', (cb) => {
  logDevelopment();
  const HOST = 'localhost';
  const PORT = 3000;
  const URI = `http://${HOST}:${PORT}/`;
  process.env.NODE_ENV = 'development';
  const config = require('./webpack.config');
  const { entry } = config;
  Object.keys(entry).forEach((key) => {
    if (key !== 'vendor') {
      entry[key].unshift(`webpack-dev-server/client?${URI}`, 'webpack/hot/dev-server');
    }
  });
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const server = new WebpackDevServer(webpack(config), config.devServer);
  server.listen(PORT, HOST, (err) => {
    if (err) { console.error(err); }
    gutil.log('[webpack-dev-server]', URI);
    cb();
  });
});

gulp.task('webpack-build', (cb) => {
  logProduction();
  process.env.NODE_ENV = 'production';
  const config = require('./webpack.config');
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin() // eslint-disable-line
  );
  const compiler = webpack(config);
  compiler.apply(new webpack.ProgressPlugin());
  compiler.run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    if (stats.hasErrors()) {
      console.error(stats.toString('errors-only'));
      return;
    }
    console.log(chalk.bgCyan.white.bold('[webpack:build]'), stats.toString({
      hash: false,
      colors: true,
      children: false,
      chunks: false,
      chunkModules: false,
      modules: false,
    }));
    cb();
  });
});


gulp.task('p', () => runSequence('rimraf', 'webpack-build'));
gulp.task('d', ['webpack-dev-server']);
gulp.task('default', ['webpack-dev-server']);
