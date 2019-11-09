const inquirer = require('inquirer')

const askPackageManager = require('./ask-package-manager')

const expectedQuestion = {
  type: 'list',
  message: '📦  Choose Package Manager ',
  name: 'packageManager',
  choices: [
    {
      name: 'npm',
      value: 'npm'
    },
    {
      name: 'yarn',
      value: 'yarn'
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

describe('ask-package-manager', () => {
  beforeEach(() => {
    inquirer.prompt.mockClear()
  })

  it('should call prompt right questions', async () => {
    await askPackageManager()
    expect(inquirer.prompt).toHaveBeenCalledWith([expectedQuestion])
  })

  it('should return the right value', async () => {
    expect(await askPackageManager()).toEqual('value')
  })
})
