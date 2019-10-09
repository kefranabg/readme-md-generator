const readme = require('./readme')
const infos = require('./project-infos')
const utils = require('./utils')
const askQuestions = require('./ask-questions')
const cleanContext = require('./clean-context')

/**
 * Main process:
 * 1) Check overwrite README.md
 * 2) Get README template path
 * 3) Gather project infos
 * 4) Ask user questions
 * 5) Clean answer context
 * 6) Build README content
 * 7) Create README.md file
 *
 * @param {Object} args
 */
module.exports = async ({ customTemplatePath, useDefaultAnswers }) => {
  if (!(await readme.checkOverwriteReadme())) return

  const templatePath = await readme.getReadmeTemplatePath(
    customTemplatePath,
    useDefaultAnswers
  )
  const projectInformations = await infos.getProjectInfos()
  const answersContext = await askQuestions(
    projectInformations,
    useDefaultAnswers
  )
  const cleanedContext = cleanContext(answersContext)
  const readmeContent = await readme.buildReadmeContent(
    cleanedContext,
    templatePath
  )

  await readme.writeReadme(readmeContent)

  utils.showEndMessage()
}
