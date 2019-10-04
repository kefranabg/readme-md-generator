const inquirer = require('inquirer')

const askOverwrite = require('./ask-overwrite')

const expectedQuestion = {
  type: 'list',
  message:
    '🚨  readme-md-generator will overwrite your current README.md. Are you sure you want to continue? ',
  name: 'overwriteReadme',
  choices: [
    {
      name: 'No',
      value: false
    },
    {
      name: 'Yes ',
      value: true
    }
  ]
}

inquirer.prompt = jest.fn(items =>
  Promise.resolve(
    items.reduce((result, item) => {
      result[item.name] = 'value'
      return result
    }, {})
  )
)

describe('ask-overwrite', () => {
  beforeEach(() => {
    inquirer.prompt.mockClear()
  })

  it('should call prompt right questions', async () => {
    await askOverwrite()
    expect(inquirer.prompt).toHaveBeenCalledWith([expectedQuestion])
  })

  it('should return the right value', async () => {
    expect(await askOverwrite()).toEqual('value')
  })
})
