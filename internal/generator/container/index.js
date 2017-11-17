const path = require('path');
const { containerExists } = require('../util');

const containerPath = path.resolve('src/js/container');
module.exports = {
  description: 'add Container',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called',
      default: 'Button',
      validate(value) {
        if (!/^[A-Za-z][A-Za-z0-9]+$/.test(value)) return 'Invalidte component name!';
        return containerExists(value) ? 'Container name already exists!' : true;
      },
    },
  ],
  actions: () => [
    {
      type: 'add',
      path: `${containerPath}/{{properCase name}}/{{properCase name}}.vue`,
      templateFile: 'container/vue.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: `${containerPath}/{{properCase name}}/index.js`,
      templateFile: 'component/index.hbs',
      abortOnFail: true,
    },
  ],
};
