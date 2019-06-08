const ejs = require('ejs')
const path = require('path')
const ora = require('ora')
const util = require('util')
const getYear = require('date-fns/get_year')
const readFile = util.promisify(require('fs').readFile)
const writeFile = util.promisify(require('fs').writeFile)

/**
 * Create readme file from the given readmeContent
 *
 * @param {string} readmeContent
 */
const writeReadme = async readmeContent =>
  await writeFile('README.md', readmeContent)

/**
 * Get README template content from the given templatePath
 *
 * @param {string} templatePath
 */
const getReadmeTemplate = async templatePath => {
  const spinner = ora('Loading README template').start()

  try {
    const template = await readFile(templatePath, 'utf8')
    spinner.succeed('README template loaded')
    return template
  } catch (err) {
    spinner.fail('README template loading fail')
    throw err
  }
}

/**
 * Build README content with the given answersContext and templateName
 *
 * @param {Object} context
 * @param {string} templateName
 */
const buildReadmeContent = async (context, templateName) => {
  const currentYear = getYear(new Date())
  const templatePath = path.resolve(
    __dirname,
    `../../templates/${templateName}.md`
  )
  const template = await getReadmeTemplate(templatePath)

  return ejs.render(template, {
    filename: templatePath,
    currentYear,
    ...context
  })
}

module.exports = {
  getReadmeTemplate,
  writeReadme,
  buildReadmeContent
}
