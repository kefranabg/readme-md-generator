const readme = require('./readme')
const infos = require('./project-info')
const utils = require('./utils')


/**
 * Main process:
 * 1) Get README template path
 * 2) Gather project infos
 * 3) Build README content
 * 4) Create README.md file
 *
 * @param {Object} args
 */
module.exports = async ({ customTemplatePath, useDefaultAnswers }) => {
  const templatePath = await readme.getReadmeTemplatePath(
    customTemplatePath,
    useDefaultAnswers
  )
  const projectInformation = await infos.getProjectInfo()

  const readmeContent = await readme.buildReadmeContent(
      projectInformation,
    templatePath
  )

  await readme.writeReadme(readmeContent)

  utils.showEndMessage()
}
