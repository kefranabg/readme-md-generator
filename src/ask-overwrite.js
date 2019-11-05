const inquirer = require('inquirer')

const question = {
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

/**
 * Ask users if they want to overwrite the existing README
 */
module.exports = async () => {
  const { overwriteReadme } = await inquirer.prompt([question])
  return overwriteReadme
}
