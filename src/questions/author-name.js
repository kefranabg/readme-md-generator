module.exports = projectInfos => ({
  type: 'input',
  message: 'Enter your name',
  name: 'authorName',
  default: projectInfos.author
})
