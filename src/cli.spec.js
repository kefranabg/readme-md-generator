const inquirer = require('inquirer')
const mainProcess = require('./cli')
const infos = require('./project-infos')
const readme = require('./readme')
const utils = require('./utils')
const askQuestions = require('./ask-questions')
const cleanContext = require('./clean-context')

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

jest.mock('./clean-context', () =>
  jest.fn(() => ({ projectName: 'readme-md-generator-after-context-clean' }))
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

  it('should stop immediatly if user dont want overwrite', async () => {
    const customTemplatePath = undefined
    const useDefaultAnswers = true
    infos.getProjectInfos = jest.fn()
    readme.buildReadmeContent = jest.fn()
    readme.getReadmeTemplatePath = jest.fn()
    readme.writeReadme = jest.fn()
    readme.checkOverwriteReadme = jest.fn(() => Promise.resolve(false))
    utils.showEndMessage = jest.fn()

    await mainProcess({ customTemplatePath, useDefaultAnswers })

    expect(infos.getProjectInfos).not.toHaveBeenCalled()
    expect(cleanContext).not.toHaveBeenCalled()
    expect(readme.buildReadmeContent).not.toHaveBeenCalled()
    expect(readme.getReadmeTemplatePath).not.toHaveBeenCalled()
    expect(readme.writeReadme).not.toHaveBeenCalled()
    expect(utils.showEndMessage).not.toHaveBeenCalled()
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
    readme.checkOverwriteReadme = jest.fn(() => Promise.resolve(true))
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
    expect(cleanContext).toHaveBeenNthCalledWith(1, {
      projectName: 'readme-md-generator'
    })
    expect(readme.buildReadmeContent).toHaveBeenNthCalledWith(
      1,
      { projectName: 'readme-md-generator-after-context-clean' },
      templatePath
    )
    expect(readme.writeReadme).toHaveBeenNthCalledWith(1, readmeContent)
    expect(utils.showEndMessage).toHaveBeenCalledTimes(1)
  })
})
