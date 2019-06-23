module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'eslint:recommended'],
  rules: {
    semi: ['error', 'never'],
    'no-use-before-define': ['error', { functions: false }],
    'comma-dangle': 0,
    'no-var': 2,
    'prefer-const': 2,
    'operator-linebreak': 0,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    indent: 0,
    'no-param-reassign': 0,
    'function-paren-newline': 0,
    'arrow-parens': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
