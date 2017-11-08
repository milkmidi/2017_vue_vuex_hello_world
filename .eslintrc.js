module.exports = {
  root: true,
  extends: [
    'airbnb-base'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    jsx: true
  },
  env: {
    browser: true,
  },
  plugins: [
    'html',
    'vue-libs',
  ],
  globals: {
    FB: false,
    pug: false,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  rules: {
    'vue-libs/jsx-uses-vars': 2,
    'class-methods-use-this': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': ['error', 'always', {
      js: 'never'
    }],
    'no-param-reassign': ['error', {
      props: false
    }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true
    }],
  },
};