module.exports = projectInfos => ({
  type: 'input',
  message: 'ℹ️  Project version (use empty value to skip)',
  name: 'projectVersion',
  default: projectInfos.version
})
