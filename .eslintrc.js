module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    mocha: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      classes: true,
    },
  },
  extends: [
    'eslint-config-tencent',
  ],
  rules: {
    indent: 'error',
    quotes: 'error',
  },
};
