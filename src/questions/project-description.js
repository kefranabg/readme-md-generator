const get = require('lodash/get')

module.exports = packageJson => ({
  type: 'input',
  message: 'Enter your project description',
  name: 'projectDescription',
  default: get(packageJson, 'description', undefined)
})
