const fs = require('fs');
const path = require('path');

const componentNames = fs.readdirSync(path.resolve('src/js/component'));
const containerNames = fs.readdirSync(path.resolve('src/js/container'));

const componentExists = comp => componentNames.indexOf(comp) > 0;
const containerExists = comp => containerNames.indexOf(comp) > 0;

module.exports = {
  componentExists,
  containerExists,
};
