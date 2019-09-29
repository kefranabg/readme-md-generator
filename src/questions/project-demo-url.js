module.exports = projectInfos => ({
  type: 'input',
  message: '✨  Project demo url (use empty value to skip)',
  name: 'projectDemoUrl',
  default: projectInfos.demoUrl
})
