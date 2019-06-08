const ejs = require('ejs')
const path = require('path')
const inquirer = require('inquirer')
const { isNil } = require('lodash')
const getYear = require('date-fns/get_year')
const boxen = require('boxen')
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
const askQuestions = async projectInfos => {
  let answersContext = {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl,
    projectPrerequisites: undefined
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

/**
 * Display end message
 */
const displayEndMessage = () => {
  process.stdout.write(
    boxen(
      `
README.md was successfully generated.
Thanks for using readme-md-generator !
`,
      {
        padding: 1,
        margin: { top: 2, bottom: 3 },
        borderColor: 'cyan',
        align: 'center',
        borderStyle: 'double'
      }
    )
  )
}

module.exports = async args => {
  const templatePath = path.resolve(
    __dirname,
    `../templates/${args.template}.md`
  )

  const template = await getTemplate(templatePath)
  const projectInfos = await getProjectInfos()
  const context = await askQuestions(projectInfos)
  const currentYear = getYear(new Date())

  const readmeContent = ejs.render(template, {
    filename: templatePath,
    currentYear,
    ...context
  })

  await createReadme(readmeContent)

  displayEndMessage()
}
