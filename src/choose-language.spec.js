const inquirer = require('inquirer')

const chooseLanguage = require('./choose-language')

const englishMessages = {
  welcome: "Welcome to",
  docTitle: "Documentation",
  homeTitle: "Homepage",
  preReqTitle: "Prerequisites"
}
const portugueseMessages = {
  welcome: "Bem Vindos ao",
  docTitle: "Documentação",
  homeTitle: "Página Inicial",
  preReqTitle: "Pré Requisitos"
}

const defaultLanguage = englishMessages

inquirer.prompt = jest.fn(() =>
  Promise.resolve({ readmeLanguage: defaultLanguage })
)

describe('choose-language', () => {
  it('should return user choice', async () => {
    const result = await chooseLanguage(false)

    expect(result).toEqual(defaultLanguage)
  })

  it('should return default language', async () => {
    const result = await chooseLanguage(true)

    expect(result).toEqual(defaultLanguage)
  })

  it('should call prompt with correct parameters', async () => {
    await chooseLanguage(false)

    expect(inquirer.prompt).toHaveBeenNthCalledWith(1, [
      {
        type: 'list',
        message:
          '🌎  Language of the README file',
        name: 'readmeLanguage',
        choices: [
          {
            name: 'English ',
            value: englishMessages
          },
          {
            name: 'Portuguese',
            value: portugueseMessages
          }
        ]
      }
    ])
  })
})
