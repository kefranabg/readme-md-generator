const cli = require('./cli')
const projectInfos = require('./project-infos')
const readme = require('./readme')
const utils = require('./utils')

describe('cli', () => {
  describe('mainProcess', () => {
    it('should call main functions with correct args', async () => {
      const template = 'default'
      const projectInformations = { name: 'readme-md-generator' }
      const readmeContent = 'content'
      const answersContext = { projectName: 'readme-md-generator' }
      projectInfos.getProjectInfos = jest.fn(() =>
        Promise.resolve(projectInformations)
      )
      cli.askQuestions = jest.fn(() => Promise.resolve(answersContext))
      readme.buildReadmeContent = jest.fn(() => Promise.resolve(readmeContent))
      readme.writeReadme = jest.fn()
      utils.showEndMessage = jest.fn()

      await cli.mainProcess({ template })

      expect(projectInfos.getProjectInfos).toHaveBeenCalledTimes(1)
      expect(cli.askQuestions).toHaveBeenCalledTimes(1)
      expect(cli.askQuestions).toHaveBeenCalledWith(projectInformations)
      expect(readme.buildReadmeContent).toHaveBeenCalledTimes(1)
      expect(readme.buildReadmeContent).toHaveBeenCalledWith(
        answersContext,
        template
      )
      expect(readme.writeReadme).toHaveBeenCalledTimes(1)
      expect(readme.writeReadme).toHaveBeenCalledWith(readmeContent)
      expect(utils.showEndMessage).toHaveBeenCalledTimes(1)
    })
  })
})
