const isNil = require('lodash/isNil')

module.exports = projectInfos => ({
  type: 'input',
  message: '✅  Test command (use empty value to skip)',
  name: 'testCommand',
  default: answers => {
    const testScriptExists = !isNil(projectInfos.testCommand)
    const packageManager = answers.packageManager || projectInfos.packageManager
    return testScriptExists ? `${packageManager} run test` : undefined
  }
})
