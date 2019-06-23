const ejs = require('ejs')
const ora = require('ora')
const { promisify } = require('util')
const getYear = require('date-fns/get_year')
const fs = require('fs')
const path = require('path')
const { isNil } = require('lodash')

const README_PATH = 'README.md'

/**
 * Create readme file from the given readmeContent
 *
 * @param {string} readmeContent
 */
const writeReadme = async readmeContent => {
  const spinner = ora('Creating README').start()

  try {
    await promisify(fs.writeFile)(README_PATH, readmeContent)
    spinner.succeed('README created')
  } catch (err) {
    spinner.fail('README creation fail')
    throw err
  }
}

/**
 * Get README template content from the given templatePath
 *
 * @param {string} templatePath
 */
const getReadmeTemplate = async templatePath => {
  const spinner = ora('Loading README template').start()

  try {
    const template = await promisify(fs.readFile)(templatePath, 'utf8')
    spinner.succeed('README template loaded')
    return template
  } catch (err) {
    spinner.fail('README template loading fail')
    throw err
  }
}

/**
 * Build README content with the given context and templatePath
 *
 * @param {Object} context
 * @param {string} templatePath
 */
const buildReadmeContent = async (context, templatePath) => {
  const currentYear = getYear(new Date())
  const template = await getReadmeTemplate(templatePath)

  return ejs.render(template, {
    filename: templatePath,
    currentYear,
    ...context
  })
}

/**
 * Get path to the readme template
 *
 * @param {string} availableTemplate
 * @param {string} customTemplate
 */
const getReadmeTemplatePath = args => {
  const spinner = ora('Resolving README template path').start()

  const { template: availableTemplate, path: customTemplate } = args

  const templatePath = isNil(customTemplate)
    ? path.resolve(__dirname, `../templates/${availableTemplate}.md`)
    : customTemplate

  try {
    fs.lstatSync(templatePath).isFile()
  } catch (err) {
    spinner.fail(`The template path '${templatePath}' is not valid.`)
    throw err
  }

  spinner.succeed('README template path resolved')

  return templatePath
}

module.exports = {
  writeReadme,
  buildReadmeContent,
  README_PATH,
  getReadmeTemplatePath
}
