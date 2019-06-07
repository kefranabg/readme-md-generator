module.exports = projectInfos => ({
  type: 'input',
  message: 'Enter your project name',
  name: 'projectName',
  default: projectInfos.name
})
