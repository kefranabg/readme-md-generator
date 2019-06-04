const loadJsonFile = require('load-json-file')

const getPackageJson = async () => {
  let packageJson = undefined

  try {
    packageJson = await loadJsonFile('package.json')
  } catch (err) {
    // eslint-disable-next-line no-empty
  }

  return packageJson
}

module.exports = {
  getPackageJson
}
