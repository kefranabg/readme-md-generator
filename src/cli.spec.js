const inquirer = require('inquirer')
const cli = require('./cli')
const projectInfos = require('./project-infos')
const readme = require('./readme')
const utils = require('./utils')
const questions = require('./questions')

const realAskQuestions = cli.askQuestions

inquirer.prompt = jest.fn(([question]) =>
  Promise.resolve({ [question.name]: 'value' })
)

jest.mock('./questions', () => ({
  askProjectName: jest.fn(() => ({ name: 'askProjectName' })),
  askProjectVersion: jest.fn(() => ({ name: 'askProjectVersion' })),
  askProjectDescription: jest.fn(() => ({ name: 'askProjectDescription' }))
}))

describe('cli', () => {
  describe('mainProcess', () => {
    const answersContext = { projectName: 'readme-md-generator' }

    beforeAll(() => {
      cli.askQuestions = jest.fn(() => Promise.resolve(answersContext))
    })

    afterAll(() => {
      cli.askQuestions = realAskQuestions
    })

    it('should call main functions with correct args', async () => {
      const template = 'default'
      const projectInformations = { name: 'readme-md-generator' }
      const readmeContent = 'content'
      projectInfos.getProjectInfos = jest.fn(() =>
        Promise.resolve(projectInformations)
      )
      readme.buildReadmeContent = jest.fn(() => Promise.resolve(readmeContent))
      readme.writeReadme = jest.fn()
      utils.showEndMessage = jest.fn()

      await cli.mainProcess({ template })

      expect(projectInfos.getProjectInfos).toHaveBeenCalledTimes(1)
      expect(cli.askQuestions).toHaveBeenCalledTimes(1)
      expect(cli.askQuestions).toHaveBeenCalledWith(projectInformations, undefined)
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

  describe('askQuestions', () => {
    it('should call all builder functions exported by questions', async () => {
      const projectInfos = { name: 'readme-md-generator' }

      await cli.askQuestions(projectInfos)

      expect(questions.askProjectName).toHaveBeenCalledTimes(1)
      expect(questions.askProjectVersion).toHaveBeenCalledTimes(1)
      expect(questions.askProjectDescription).toHaveBeenCalledTimes(1)
    })

    it('should return merged contexts', async () => {
      const projectInfos = { name: 'readme-md-generator' }

      const context = await cli.askQuestions(projectInfos)

      expect(context).toEqual({
        askProjectName: 'value',
        askProjectVersion: 'value',
        askProjectDescription: 'value',
        isGithubRepos: undefined,
        repositoryUrl: undefined,
        projectPrerequisites: undefined
      })
    })
  })
})
