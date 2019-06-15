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
  askProjectName: jest.fn(() => ({
    name: 'askProjectName',
    type: 'input',
    default: 'default'
  })),
  askProjectVersion: jest.fn(() => ({
    name: 'askProjectVersion',
    type: 'input'
  })),
  askProjectDescription: jest.fn(() => ({
    name: 'askProjectDescription',
    type: 'checkbox',
    choices: [
      { value: { name: 'choiceOne', value: 1 }, checked: true },
      { value: { name: 'choiceTwo', value: 2 }, checked: false }
    ]
  }))
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
      expect(cli.askQuestions).toHaveBeenCalledWith(
        projectInformations,
        undefined
      )
      expect(readme.buildReadmeContent).toHaveBeenCalledTimes(1)
      expect(readme.buildReadmeContent).toHaveBeenCalledWith(
        answersContext,
        template
      )
      expect(readme.writeReadme).toHaveBeenCalledTimes(1)
      expect(readme.writeReadme).toHaveBeenCalledWith(readmeContent)
      expect(utils.showEndMessage).toHaveBeenCalledTimes(1)
    })

    it('should forward --yes option to askQuestions', async () => {
      const template = 'default'
      const projectInformations = { name: 'readme-md-generator' }
      const skipQuestions = true
      utils.showEndMessage = jest.fn()

      await cli.mainProcess({ template, yes: skipQuestions })

      expect(cli.askQuestions).toHaveBeenCalledWith(
        projectInformations,
        skipQuestions
      )

      expect(utils.showEndMessage).toHaveBeenCalledTimes(1)
    })
  })

  describe('getDefaultAnswer', () => {
    it('should handle input prompts correctly', () => {
      let question = { type: 'input', default: 'default' }
      let result = cli.getDefaultAnswer(question)
      expect(result).toEqual(question.default)

      question = {
        type: 'checkbox',
        choices: [
          { value: { name: 'name', value: 'value' }, checked: true },
          { checked: false }
        ]
      }
      result = cli.getDefaultAnswer(question)
      expect(result.length).toEqual(1)
      expect(result[0].name).toEqual(question.choices[0].value.name)
    })

    it('should return empty string for non-defaulted fields', () => {
      const question = { type: 'input' }
      const result = cli.getDefaultAnswer(question)
      expect(result).toEqual('')
    })

    it('should return undefined for invalid types', () => {
      const question = { type: 'invalid' }
      const result = cli.getDefaultAnswer(question)
      expect(result).toEqual(undefined)
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

      expect(result.askProjectName).toEqual('default')
      expect(result.askProjectVersion).toEqual('')
      expect(result.askProjectDescription).toEqual([
        { name: 'choiceOne', value: 1 }
      ])
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
