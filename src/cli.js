const readme = require('./readme')
const infos = require('./project-infos')
const utils = require('./utils')
const askQuestions = require('./ask-questions')

/**
 * Main process:
 * 1) Get Language of the README file
 * 2) Get README template path
 * 3) Gather project infos
 * 4) Ask user questions
 * 5) Build README content
 * 6) Create README.md file
 *
 * @param {Object} args
 */
module.exports = async ({ customTemplatePath, useDefaultAnswers }) => {
  const readmeLanguage = await readme.getReadmeLanguage(useDefaultAnswers)

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
    readmeLanguage,
    answersContext,
    templatePath
  )

  await readme.writeReadme(readmeContent)

  utils.showEndMessage()
}
