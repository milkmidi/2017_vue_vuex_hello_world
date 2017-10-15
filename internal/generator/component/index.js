const path = require('path');
const { componentExists } = require('../util');

module.exports = {
  description: 'add Component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called',
      default: 'Button',
      validate(value) {
        if (!/^[A-Za-z][A-Za-z0-9]+$/.test(value)) return 'Invalidte component name!';
        return componentExists(value) ? 'Component name already exists!' : true;
      },
    }],
  actions: () => [
    {
      type: 'add',
      path: `${path.resolve('src/js/component')}/{{properCase name}}.vue`,
      templateFile: 'generator/component/vue.hbs',
      abortOnFail: true,
    },
  ],
};
