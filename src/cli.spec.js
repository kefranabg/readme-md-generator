const inquirer = require('inquirer')
const mainProcess = require('./cli')
const infos = require('./project-infos')
const readme = require('./readme')
const utils = require('./utils')
const askQuestions = require('./ask-questions')

inquirer.prompt = jest.fn(items =>
  Promise.resolve(
    items.reduce((result, item) => {
      result[item.name] = 'value'
      return result
    }, {})
  )
)

jest.mock('./ask-questions', () =>
  jest.fn(() => Promise.resolve({ projectName: 'readme-md-generator' }))
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

describe('mainProcess', () => {
  afterEach(() => {
    askQuestions.mockClear()
  })

  it('should call main functions with correct args', async () => {
    const customTemplatePath = undefined
    const useDefaultAnswers = true
    const projectInformations = { name: 'readme-md-generator' }
    const readmeContent = 'content'
    const templatePath = 'path/to/template'
    infos.getProjectInfos = jest.fn(() => Promise.resolve(projectInformations))
    readme.buildReadmeContent = jest.fn(() => Promise.resolve(readmeContent))
    readme.getReadmeTemplatePath = jest.fn(() => Promise.resolve(templatePath))
    readme.writeReadme = jest.fn()
    utils.showEndMessage = jest.fn()

    await mainProcess({ customTemplatePath, useDefaultAnswers })

    expect(readme.getReadmeTemplatePath).toHaveBeenNthCalledWith(
      1,
      customTemplatePath,
      useDefaultAnswers
    )
    expect(infos.getProjectInfos).toHaveBeenCalledTimes(1)
    expect(askQuestions).toHaveBeenNthCalledWith(
      1,
      projectInformations,
      useDefaultAnswers
    )
    expect(readme.buildReadmeContent).toHaveBeenNthCalledWith(
      1,
      { projectName: 'readme-md-generator' },
      templatePath
    )
    expect(readme.writeReadme).toHaveBeenNthCalledWith(1, readmeContent)
    expect(utils.showEndMessage).toHaveBeenCalledTimes(1)
  })
})
