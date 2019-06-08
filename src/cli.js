const ejs = require('ejs')
const path = require('path')
const inquirer = require('inquirer')
const { negate, isNil } = require('lodash')
const getYear = require('date-fns/get_year')
const { getProjectInfos } = require('./utils')

const { getTemplate, createReadme } = require('./utils')
const {
  askProjectName,
  askProjectDescription,
  askAuhtorName,
  askAuthorGithub,
  askAuthorTwitter,
  askLicenseUrl,
  askContributing,
  askProjectVersion,
  askProjectPrerequisites,
  askLicenseName,
  askProjectDocumentationUrl
} = require('./questions')

/**
 * Ask user questions and return context to generate a README
 */
const askQuestions = async () => {
  const projectInfos = await getProjectInfos()
  let answersContext = {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl
  }
  const questionFns = [
    askProjectName,
    askProjectVersion,
    askProjectDescription,
    askProjectDocumentationUrl,
    askAuhtorName,
    askAuthorGithub,
    askAuthorTwitter,
    askProjectPrerequisites,
    askLicenseName,
    askLicenseUrl,
    askContributing
  ]

  for (const questionFn of questionFns) {
    const question = questionFn(projectInfos, answersContext)

    if (!isNil(question)) {
      const currentAnswerContext = await inquirer.prompt([question])
      answersContext = {
        ...answersContext,
        ...currentAnswerContext
      }
    }
  }

  return answersContext
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
