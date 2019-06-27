const inquirer = require('inquirer')
const path = require('path')

const chooseTemplate = require('./choose-template')

const defaultTemplatePath = path.resolve(__dirname, '../templates/default.md')
const defaultNoHtmlTemplatePath = path.resolve(
  __dirname,
  '../templates/default-no-html.md'
)

inquirer.prompt = jest.fn(() =>
  Promise.resolve({ templatePath: defaultTemplatePath })
)

describe('choose-template', () => {
  it('should return user choice', async () => {
    const result = await chooseTemplate(false)

    expect(result).toEqual(defaultTemplatePath)
  })

  it('should return default template', async () => {
    const result = await chooseTemplate(true)

    expect(result).toEqual(defaultTemplatePath)
  })

  it('should call prompt with correct parameters', async () => {
    await chooseTemplate(false)

    expect(inquirer.prompt).toHaveBeenNthCalledWith(1, [
      {
        type: 'list',
        message:
          '🎨  Use HTML in your README.md for a nicer rendering? (not supported everywhere. ex: Bitbucket)',
        name: 'templatePath',
        choices: [
          {
            name: 'Yes ',
            value: defaultTemplatePath
          },
          {
            name: 'No',
            value: defaultNoHtmlTemplatePath
          }
        ]
      }
    ])
  })
})
