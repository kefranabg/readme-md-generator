const inquirer = require('inquirer')
const path = require('path')

module.exports = async useDefaultAnswers => {
  const defaultTemplate = path.resolve(__dirname, '../templates/default.md')
  const defaultNoHtmlTemplate = path.resolve(
    __dirname,
    '../templates/default-no-html.md'
  )

  if (useDefaultAnswers) return defaultTemplate

  const question = {
    type: 'list',
    message:
      '🎨  Use HTML in your README.md for a nicer rendering? (not supported everywhere. ex: Bitbucket)',
    name: 'templatePath',
    choices: [
      {
        name: 'Yes ',
        value: defaultTemplate
      },
      {
        name: 'No',
        value: defaultNoHtmlTemplate
      }
    ]
  }

  const { templatePath } = await inquirer.prompt([question])

  return templatePath
}
