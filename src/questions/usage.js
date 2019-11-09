module.exports = projectInfos => ({
  type: 'input',
  message: '🚀  Usage command or instruction (use empty value to skip)',
  name: 'usage',
  default: answers => {
    if (projectInfos.isJSProject) {
      const packageManager =
        projectInfos.packageManager || answers.packageManager
      return `${packageManager} run start`
    }
    return undefined
  }
})
