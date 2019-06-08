const loadJsonFile = require('load-json-file')
const boxen = require('boxen')

/**
 * Display end message
 */
const showEndMessage = () => {
  const message = `README.md was successfully generated.
  Thanks for using readme-md-generator !`
  const boxenConfig = {
    padding: 1,
    margin: { top: 2, bottom: 3 },
    borderColor: 'cyan',
    align: 'center',
    borderStyle: 'double'
  }

  process.stdout.write(boxen(message, boxenConfig))
}

/**
 * Get package.json content
 */
const getPackageJson = async () => {
  try {
    return loadJsonFile('package.json')
  } catch (err) {
    return undefined
  }
}

module.exports = {
  getPackageJson,
  showEndMessage
}
