const inquirer = require('inquirer')

const questions = require('./questions')
const askQuestions = require('./ask-questions')

inquirer.prompt = jest.fn(items =>
  Promise.resolve(
    items.reduce((result, item) => {
      result[item.name] = 'value'
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

describe('ask-questions', () => {
  beforeEach(() => {
    inquirer.prompt.mockClear()
  })

  it('should call all builder functions exported by questions', async () => {
    const projectInfos = { name: 'readme-md-generator' }

    await askQuestions(projectInfos, false)

    expect(questions.askProjectName).toHaveBeenCalledTimes(1)
    expect(questions.askProjectVersion).toHaveBeenCalledTimes(1)
    expect(questions.askProjectDescription).toHaveBeenCalledTimes(1)
  })

  it('should use default values with --yes option', async () => {
    const result = await askQuestions({}, true)

    expect(inquirer.prompt).not.toHaveBeenCalled()
    expect(result).toEqual({
      projectName: 'defaultProjectName',
      projectVersion: '',
      projectDescription: [{ name: 'choiceOne', value: 1 }],
      isGithubRepos: undefined,
      repositoryUrl: undefined,
      projectPrerequisites: undefined,
      isProjectOnNpm: false
    })
  })

  it('should return merged contexts', async () => {
    const projectInfos = { name: 'readme-md-generator' }

    const context = await askQuestions(projectInfos, false)

    expect(context).toEqual({
      projectName: 'value',
      projectVersion: 'value',
      projectDescription: 'value',
      isGithubRepos: undefined,
      repositoryUrl: undefined,
      projectPrerequisites: undefined,
      isProjectOnNpm: true
    })
  })
})
