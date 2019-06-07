module.exports = projectInfos => ({
  type: 'input',
  message: 'Enter your project description',
  name: 'projectDescription',
  default: projectInfos.description
})
