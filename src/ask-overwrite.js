const inquirer = require('inquirer')

const question = {
  type: 'list',
  message:
    '⚠  Readme-md-generator will overwrite your current README.md. Are you sure you want to continue? ',
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

/**
 * Ask user if he wants overwrite the existed README
 */
module.exports = async () => {
  const { overwriteReadme } = await inquirer.prompt([question])
  return overwriteReadme
}
