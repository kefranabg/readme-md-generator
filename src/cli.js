const ejs = require('ejs')
const path = require('path')
const inquirer = require('inquirer')
const getYear = require('date-fns/get_year')
const { getProjectInfos } = require('./utils')

const { getTemplate, createReadme } = require('./utils')
const {
  askProjectName,
  askProjectDescription,
  askAuhtorName,
  askAuhtorGithub,
  askAuhtorTwitter,
  askLicenseUrl,
  askContributing
} = require('./questions')

/**
 * Ask user questions and return context to generate a README
 */
const askQuestions = async () => {
  const projectInfos = await getProjectInfos()

  const questions = [
    askProjectName(projectInfos),
    askProjectDescription(projectInfos),
    askAuhtorName(projectInfos),
    askAuhtorGithub(),
    askAuhtorTwitter(),
    askLicenseUrl(projectInfos),
    askContributing(projectInfos)
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
