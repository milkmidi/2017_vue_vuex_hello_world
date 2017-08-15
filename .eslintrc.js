module.exports = {
  root: true,
  extends: ['airbnb-base'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  plugins: [
    'html',
  ],
  globals: {
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'no-console': 0
  },
};