const getProjectName = require('project-name')

module.exports = () => ({
  type: 'input',
  message: 'Enter your project name',
  name: 'projectName',
  default: getProjectName() || undefined
})
