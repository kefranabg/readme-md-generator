module.exports = projectInfos => ({
  type: 'input',
  message: '📦  Install command (use empty value to skip)',
  name: 'installCommand',
  default: answers => {
    if (projectInfos.isJSProject) {
      const packageManager =
        projectInfos.packageManager || answers.packageManager
      return `${packageManager} install`
    }
    return undefined
  }
})
