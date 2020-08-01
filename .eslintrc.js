module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    mocha: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      classes: true
    }
  },
  extends: [
    'airbnb-base'
  ],
  rules: {
    'max-classes-per-file': 'off',
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'no-unused-expressions': 'off',
    'arrow-parens': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'max-len': ['error', { code: 160, ignoreComments: true }],
    // 使用单引号
    quotes: ['error', 'single'],
    'no-continue': 'off',
    // 关键字前后加空格
    'keyword-spacing': ['error', { before: true }],
    'space-before-function-paren': 'off',
    'prefer-destructuring': 'warn',
    'no-shadow': 'warn',
    'comma-dangle': ['off'],
    'no-void': 'warn',
    'no-self-compare': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off'
  }
};
