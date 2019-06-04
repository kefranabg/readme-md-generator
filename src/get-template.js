const util = require('util')
const readFile = util.promisify(require('fs').readFile)

module.exports = async templateName =>
  await readFile(`./templates/${templateName}.md`, 'utf8')
