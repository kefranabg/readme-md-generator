const isNil = require('lodash/isNil')

module.exports = projectInfos => ({
  type: 'input',
  message: '🚀  Usage command or instruction (use empty value to skip)',
  name: 'usage',
  default: answers => {
    const packageManager = answers.packageManager || projectInfos.packageManager
    return projectInfos.hasStartCommand && !isNil(packageManager)
      ? `${packageManager} run start`
      : undefined
  }
})
