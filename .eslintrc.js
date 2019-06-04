module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'eslint:recommended'],
  rules: {
    'no-var': 2,
    'prefer-const': 2
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
