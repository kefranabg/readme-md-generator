const ejs = require('ejs')
const inquirer = require('inquirer')

const { getTemplate, createReadme } = require('./utils')
const {
  getProjectName,
  getProjectDescription,
  getAuhtorName,
  getAuhtorGithub,
  getAuhtorTwitter
} = require('./questions')

/**
 * Ask user questions and return context to generate a README
 */
const askQuestions = async () => {
  const questions = [
    getProjectName(),
    await getProjectDescription(),
    await getAuhtorName(),
    getAuhtorGithub(),
    getAuhtorTwitter()
  ]

  return inquirer.prompt(questions)
}

module.exports = async args => {
  const template = await getTemplate(args.template)
  const context = await askQuestions()
  const readmeContent = ejs.render(template, context)

  await createReadme(readmeContent)
}
