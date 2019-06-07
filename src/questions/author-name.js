const get = require('lodash/get')

module.exports = packageJson => ({
  type: 'input',
  message: 'Enter your name',
  name: 'authorName',
  default: get(packageJson, 'author', undefined)
})
