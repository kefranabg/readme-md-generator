module.exports = projectInfos => ({
  type: 'input',
  message: '🏠  Author homepage (use empty value to skip)',
  name: 'authorHomepage',
  default: projectInfos.authorHomepage
})
