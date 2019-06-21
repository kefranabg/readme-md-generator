const inquirer = require('inquirer')

const readme = require('./readme')
const projectInfos = require('./project-infos')
const questionsBuilders = require('./questions')
const utils = require('./utils')

/**
 * Ask user questions and return context to generate a README
 *
 * @param {Object} projectInfos
 */
const askQuestions = async (projectInfos, skipQuestions) => {
  const questions = []

  for (const questionBuilder of Object.values(questionsBuilders)) {
    const question = questionBuilder(projectInfos)
    questions.push(question)
  }

  const answersContext = skipQuestions
    ? getDefaultAnswers(questions)
    : await inquirer.prompt(questions)

  return {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl,
    projectPrerequisites: undefined,
    ...answersContext
  }
}

const getDefaultAnswers = questions => {
  let answersContext = {}

  questions.forEach(question => {
    answersContext = {
      [question.name]: getDefaultAnswer(question),
      ...answersContext
    }
  })

  return answersContext
}

/**
 * Get the default answer depending on the question type
 *
 * @param {Object} question
 */
const getDefaultAnswer = question => {
  switch (question.type) {
    case 'input':
      return question.default || ''
    case 'checkbox':
      return question.choices
        .filter(choice => choice.checked)
        .map(choice => choice.value)
    default:
      return undefined
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
  const projectInformations = await projectInfos.getProjectInfos()
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
  getDefaultAnswer,
  askQuestions
}

module.exports = cli
