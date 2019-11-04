const inquirer = require('inquirer')

const question = {
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

/**
 * Ask user if they want to use npm or yarn
 */
module.exports = async () => {
  const { packageManager } = await inquirer.prompt([question])
  return packageManager
}
