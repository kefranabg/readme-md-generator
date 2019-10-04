module.exports = projectInfos => ({
  type: 'input',
  message: '👤  Author name (use comma if several)',
  name: 'authorName',
  default: projectInfos.author
})
