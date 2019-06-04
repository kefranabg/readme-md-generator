const get = require('lodash/get')

const { getPackageJson } = require('../utils')

module.exports = async () => {
  const packageJson = await getPackageJson()

  return {
    type: 'input',
    message: 'Enter your project description',
    name: 'projectDescription',
    default: get(packageJson, 'description', undefined)
  }
}
