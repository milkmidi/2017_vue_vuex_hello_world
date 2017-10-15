/* eslint-disable */
/**
 *@author milkmidi
 *@version 1.0.0
 *@description 決解 vue loader 在用 ExtractTextPlugin css 時，publicPath 不吃 ../../ 的問題
 */
const RawSource = require('webpack-sources').RawSource;

function VueExtractTextURLPlugin(options) {
  this.options = options || {};
  this.options.enabled = options.enabled === undefined ? true : options.enabled;
}

const isCSS = name => /.css/.test(name);
const replaceURL = input => input.replace(/asset\/img/g, '../img');

VueExtractTextURLPlugin.prototype.apply = function (compiler) {
  const me = this;
  compiler.plugin('emit', (compilation, callback) => {
    if (!me.options.enabled) {
      callback();
      return;
    }
    compilation.chunks.forEach((chunk) => {
      chunk.files.forEach((filename) => {
        const source = compilation.assets[filename].source();
        if (isCSS(filename)) {
          compilation.assets[filename] = new RawSource(replaceURL(source));
        }
      });
    });
    callback();
  });
};

module.exports = VueExtractTextURLPlugin;
