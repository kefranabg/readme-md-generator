const inquirer = require('inquirer')

module.exports = async useDefaultAnswers => {
  const englishMessages = {
    welcome: 'Welcome to',
    docTitle: 'Documentation',
    homeTitle: 'Homepage',
    preReqTitle: 'Prerequisites'
  }
  const portugueseMessages = {
    welcome: 'Bem Vindos ao',
    docTitle: 'Documentação',
    homeTitle: 'Página Inicial',
    preReqTitle: 'Pré Requisitos'
  }

  if (useDefaultAnswers) return englishMessages

  const question = {
    type: 'list',
    message: '🌎  Language of the README file',
    name: 'readmeLanguage',
    choices: [
      {
        name: 'English',
        value: englishMessages
      },
      {
        name: 'Portuguese',
        value: portugueseMessages
      }
    ]
  }
  const { readmeLanguage } = await inquirer.prompt([question])
  return readmeLanguage
}
