module.exports = projectInfos => ({
  type: 'input',
  message: '✅  Test command (use empty value to skip)',
  name: 'testCommand',
  default: projectInfos.testCommand
})
