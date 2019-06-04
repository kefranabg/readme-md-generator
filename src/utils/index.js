const util = require('util')
const readFile = util.promisify(require('fs').readFile)
const writeFile = util.promisify(require('fs').writeFile)
const loadJsonFile = require('load-json-file')

/**
 * Create readme file from the given readmeContent
 *
 * @param {string} readmeContent
 */
const createReadme = async readmeContent =>
  await writeFile('README.md', readmeContent)

/**
 * Get template content from the given templateName
 *
 * @param {string} templateName
 */
const getTemplate = async templateName =>
  await readFile(`./templates/${templateName}.md`, 'utf8')

/**
 * Get package.json content
 */
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
  getPackageJson,
  getTemplate,
  createReadme
}
