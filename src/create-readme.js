const util = require('util')
const writeFile = util.promisify(require('fs').writeFile)

module.exports = async readmeContent =>
  await writeFile('README.md', readmeContent)
