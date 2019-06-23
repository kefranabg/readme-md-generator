const inquirer = require('inquirer')
const cli = require('./cli')
const projectInfos = require('./project-infos')
const readme = require('./readme')
const utils = require('./utils')
const questions = require('./questions')

const realAskQuestions = cli.askQuestions

inquirer.prompt = jest.fn(questions =>
  Promise.resolve(
    questions.reduce((result, question) => {
      result[question.name] = 'value'
      return result
    }, {})
  )
)

jest.mock('./questions', () => ({
  askProjectName: jest.fn(() => ({
    name: 'projectName',
    type: 'input',
    default: 'defaultProjectName'
  })),
  askProjectVersion: jest.fn(() => ({
    name: 'projectVersion',
    type: 'input'
  })),
  askProjectDescription: jest.fn(() => ({
    name: 'projectDescription',
    type: 'checkbox',
    choices: [
      { value: { name: 'choiceOne', value: 1 }, checked: true },
      { value: { name: 'choiceTwo', value: 2 }, checked: false }
    ]
  }))
}))

describe('cli', () => {
  beforeEach(() => {
    inquirer.prompt.mockClear()
  })

  describe('mainProcess', () => {
    const answersContext = { projectName: 'readme-md-generator' }

    beforeAll(() => {
      cli.askQuestions = jest.fn(() => Promise.resolve(answersContext))
    })

    afterEach(() => {
      cli.askQuestions.mockClear()
    })

    afterAll(() => {
      cli.askQuestions = realAskQuestions
    })

    it('should call main functions with correct args', async () => {
      const templatePath = 'default'
      const projectInformations = { name: 'readme-md-generator' }
      const readmeContent = 'content'
      projectInfos.getProjectInfos = jest.fn(() =>
        Promise.resolve(projectInformations)
      )
      readme.buildReadmeContent = jest.fn(() => Promise.resolve(readmeContent))
      readme.writeReadme = jest.fn()
      utils.showEndMessage = jest.fn()

      await cli.mainProcess({ templatePath })

      expect(projectInfos.getProjectInfos).toHaveBeenCalledTimes(1)
      expect(cli.askQuestions).toHaveBeenNthCalledWith(
        1,
        projectInformations,
        undefined
      )
      expect(readme.buildReadmeContent).toHaveBeenNthCalledWith(
        1,
        answersContext,
        templatePath
      )
      expect(readme.writeReadme).toHaveBeenNthCalledWith(1, readmeContent)
      expect(utils.showEndMessage).toHaveBeenCalledTimes(1)
    })

    it('should forward --yes option to askQuestions', async () => {
      const templatePath = 'default'
      const projectInformations = { name: 'readme-md-generator' }
      const skipQuestions = true
      utils.showEndMessage = jest.fn()

      await cli.mainProcess({ templatePath, yes: skipQuestions })

      expect(cli.askQuestions).toHaveBeenNthCalledWith(
        1,
        projectInformations,
        skipQuestions
      )
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

    it('should use default values with --yes option', async () => {
      const projectInfos = { name: 'readme-md-generator' }

      const result = await cli.askQuestions(projectInfos, true)

      expect(inquirer.prompt).not.toHaveBeenCalled()
      expect(result).toEqual({
        projectName: 'defaultProjectName',
        projectVersion: '',
        projectDescription: [{ name: 'choiceOne', value: 1 }],
        isGithubRepos: undefined,
        repositoryUrl: undefined,
        projectPrerequisites: undefined
      })
    })

    it('should return merged contexts', async () => {
      const projectInfos = { name: 'readme-md-generator' }

      const context = await cli.askQuestions(projectInfos)

      expect(context).toEqual({
        projectName: 'value',
        projectVersion: 'value',
        projectDescription: 'value',
        isGithubRepos: undefined,
        repositoryUrl: undefined,
        projectPrerequisites: undefined
      })
    })
  })
})
