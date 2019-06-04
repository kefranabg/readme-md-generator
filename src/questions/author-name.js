const get = require('lodash/get')

const { getPackageJson } = require('../utils')

module.exports = async () => {
  const packageJson = await getPackageJson()

  return {
    type: 'input',
    message: 'Enter your name',
    name: 'authorName',
    default: get(packageJson, 'author', undefined)
  }
}
