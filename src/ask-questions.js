const inquirer = require('inquirer')

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
module.exports = async (projectInfos, skipQuestions) => {
  const questions = getQuestions(projectInfos)

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
