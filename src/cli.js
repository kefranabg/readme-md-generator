const inquirer = require('inquirer')
const { isNil } = require('lodash')

const { buildReadmeContent, writeReadme } = require('./readme')
const { getProjectInfos } = require('./project-infos')
const questionsBuilders = require('./questions')
const { showEndMessage } = require('./utils')

/**
 * Ask user questions and return context to generate a README
 *
 * @param {Object} projectInfos
 */
const askQuestions = async projectInfos => {
  let answersContext = {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl,
    projectPrerequisites: undefined
  }

  for (const questionBuilder of Object.values(questionsBuilders)) {
    const question = questionBuilder(projectInfos, answersContext)

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
 * Main process:
 * 1) Gather project infos
 * 2) Ask user questions
 * 3) Build README content
 * 4) Create README.md file
 *
 * @param {Object} args
 */
const mainProcess = async args => {
  const projectInfos = await getProjectInfos()
  const answersContext = await askQuestions(projectInfos)
  const readmeContent = await buildReadmeContent(answersContext, args.template)

  await writeReadme(readmeContent)

  showEndMessage()
}

module.exports = mainProcess
