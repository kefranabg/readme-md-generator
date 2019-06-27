const inquirer = require('inquirer')

const questionsBuilders = require('./questions')
const utils = require('./utils')

/**
 * Ask user questions and return context to generate a README
 *
 * @param {Object} projectInfos
 * @param {Boolean} useDefaultAnswers
 */
module.exports = async (projectInfos, useDefaultAnswers) => {
  const questions = Object.values(questionsBuilders).flatMap(questionBuilder =>
    questionBuilder(projectInfos)
  )

  const answersContext = useDefaultAnswers
    ? utils.getDefaultAnswers(questions)
    : await inquirer.prompt(questions)

  return {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl,
    projectPrerequisites: undefined,
    ...answersContext
  }
}
