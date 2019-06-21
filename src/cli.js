const inquirer = require('inquirer')

const readme = require('./readme')
const infos = require('./project-infos')
const questionsBuilders = require('./questions')
const utils = require('./utils')

/**
 * Get questions
 *
 * @param {Object} projectInfos
 */
const getQuestions = projectInfos =>
  Object.values(questionsBuilders).reduce(
    (questions, questionBuilder) => [
      ...questions,
      questionBuilder(projectInfos)
    ],
    []
  )

/**
 * Ask user questions and return context to generate a README
 *
 * @param {Object} projectInfos
 */
const askQuestions = async (projectInfos, skipQuestions) => {
  const questions = getQuestions()

  const answersContext = skipQuestions
    ? utils.getDefaultAnswers(questions)
    : await inquirer.prompt(questions)

  return {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl,
    projectPrerequisites: undefined,
    ...answersContext
  }
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
const mainProcess = async ({ template, yes }) => {
  const projectInformations = await infos.getProjectInfos()
  const answersContext = await cli.askQuestions(projectInformations, yes)
  const readmeContent = await readme.buildReadmeContent(
    answersContext,
    template
  )

  await readme.writeReadme(readmeContent)

  utils.showEndMessage()
}

const cli = {
  mainProcess,
  askQuestions
}

module.exports = cli
