const loadJsonFile = require('load-json-file')
const boxen = require('boxen')

const END_MSG = `README.md was successfully generated.
Thanks for using readme-md-generator!`

const BOXEN_CONFIG = {
  padding: 1,
  margin: { top: 2, bottom: 3 },
  borderColor: 'cyan',
  align: 'center',
  borderStyle: 'double'
}

/**
 * Display end message
 */
const showEndMessage = () => process.stdout.write(boxen(END_MSG, BOXEN_CONFIG))

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
  showEndMessage,
  END_MSG,
  BOXEN_CONFIG
}
