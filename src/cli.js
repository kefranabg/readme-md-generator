const ejs = require('ejs')
const path = require('path')
const inquirer = require('inquirer')
const getYear = require('date-fns/get_year')
const { getPackageJson } = require('./utils')

const { getTemplate, createReadme } = require('./utils')
const {
  askProjectName,
  askProjectDescription,
  askAuhtorName,
  askAuhtorGithub,
  askAuhtorTwitter,
  askLicenseUrl
} = require('./questions')

/**
 * Ask user questions and return context to generate a README
 */
const askQuestions = async () => {
  const packageJson = await getPackageJson()

  const questions = [
    askProjectName(),
    askProjectDescription(packageJson),
    askAuhtorName(packageJson),
    askAuhtorGithub(),
    askAuhtorTwitter(),
    askLicenseUrl()
  ]

  return inquirer.prompt(questions)
}

module.exports = async args => {
  const templatePath = path.resolve(
    __dirname,
    `../templates/${args.template}.md`
  )
  const template = await getTemplate(templatePath)
  const context = await askQuestions()
  const currentYear = getYear(new Date())

  const readmeContent = ejs.render(template, {
    filename: templatePath,
    currentYear,
    ...context
  })

  await createReadme(readmeContent)
}
