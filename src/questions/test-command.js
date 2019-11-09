module.exports = projectInfos => ({
  type: 'input',
  message: '✅  Test command (use empty value to skip)',
  name: 'testCommand',
  default: answers => {
    if (projectInfos.isJSProject) {
      const packageManager =
        projectInfos.packageManager || answers.packageManager
      return `${packageManager} run test`
    }
    return undefined
  }
})
