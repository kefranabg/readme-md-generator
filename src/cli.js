const ejs = require('ejs')
const inquirer = require('inquirer')
const getProjectName = require('project-name')

const get = require('lodash/get')
const { getPackageJson } = require('./utils')
const getTemplate = require('./get-template')
const createReadme = require('./create-readme')

const getContext = async () => {
  const packageJson = await getPackageJson()

  const questions = [
    {
      type: 'input',
      message: 'Enter your project name',
      name: 'projectName',
      default: getProjectName() || undefined
    },
    {
      type: 'input',
      message: 'Enter your project description',
      name: 'projectDescription',
      default: get(packageJson, 'description', undefined)
    }
  ]

  return inquirer.prompt(questions)
}

module.exports = async function generateReadme(args) {
  const template = await getTemplate(args.template)
  const context = await getContext()
  const readmeContent = ejs.render(template, context)

  await createReadme(readmeContent)
}
