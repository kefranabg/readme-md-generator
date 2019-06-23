const readme = require('./readme')
const infos = require('./project-infos')

const utils = require('./utils')
const askQuestions = require('./ask-questions')

/**
 * Main process:
 * 1) Gather project infos
 * 2) Ask user questions
 * 3) Build README content
 * 4) Create README.md file
 *
 * @param {Object} args
 */
module.exports = async ({ templatePath, yes }) => {
  const projectInformations = await infos.getProjectInfos()
  const answersContext = await askQuestions(projectInformations, yes)
  const readmeContent = await readme.buildReadmeContent(
    answersContext,
    templatePath
  )

  await readme.writeReadme(readmeContent)

  utils.showEndMessage()
}
