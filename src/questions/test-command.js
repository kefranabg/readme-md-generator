const isNil = require('lodash/isNil')

module.exports = projectInfos => ({
  type: 'input',
  message: '✅  Test command (use empty value to skip)',
  name: 'testCommand',
  default: answers => {
    const packageManager = answers.packageManager || projectInfos.packageManager
    return projectInfos.hasTestCommand && !isNil(packageManager)
      ? `${packageManager} run test`
      : undefined
  }
})
