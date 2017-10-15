const path = require('path');
const { containerExists } = require('../util');

module.exports = {
  description: 'add Container',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called',
    default: 'Button',
    validate(value) {
      if (!/^[A-Za-z][A-Za-z0-9]+$/.test(value)) return 'Invalidte component name!';
      return containerExists(value) ? 'Component name already exists!' : true;
    },
  }],
  actions: () => [{
    type: 'add',
    path: `${path.resolve('src/js/container')}/{{properCase name}}.vue`,
    templateFile: 'generator/container/vue.hbs',
    abortOnFail: true,
  }],
};
