const readme = require('./readme')
const infos = require('./project-infos')
const utils = require('./utils')
const askQuestions = require('./ask-questions')

/**
 * Main process:
 * 1) Get README template path
 * 2) Gather project infos
 * 3) Ask user questions
 * 4) Build README content
 * 5) Create README.md file
 *
 * @param {Object} args
 */
module.exports = async ({ customTemplatePath, useDefaultAnswers }) => {
  const templatePath = await readme.getReadmeTemplatePath(
    customTemplatePath,
    useDefaultAnswers
  )
  const projectInformations = await infos.getProjectInfos()
  const answersContext = await askQuestions(
    projectInformations,
    useDefaultAnswers
  )
  const readmeContent = await readme.buildReadmeContent(
    answersContext,
    templatePath
  )

  await readme.writeReadme(readmeContent)

  utils.showEndMessage()
}
