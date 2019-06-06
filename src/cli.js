const ejs = require('ejs')
const path = require('path')
const inquirer = require('inquirer')

const { getTemplate, createReadme } = require('./utils')
const {
  askProjectName,
  askProjectDescription,
  askAuhtorName,
  askAuhtorGithub,
  askAuhtorTwitter
} = require('./questions')

/**
 * Ask user questions and return context to generate a README
 */
const askQuestions = async () => {
  const questions = [
    askProjectName(),
    await askProjectDescription(),
    await askAuhtorName(),
    askAuhtorGithub(),
    askAuhtorTwitter()
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

  const readmeContent = ejs.render(template, {
    filename: templatePath,
    ...context
  })

  await createReadme(readmeContent)
}
