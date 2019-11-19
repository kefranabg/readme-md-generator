const isEmpty = require('lodash/isEmpty')

module.exports = projectInfos => ({
  type: 'list',
  message: '📦  Choose Package Manager ',
  name: 'packageManager',
  choices: [
    {
      name: 'npm',
      value: 'npm'
    },
    {
      name: 'yarn',
      value: 'yarn'
    }
  ],
  when: () => projectInfos.isJSProject && isEmpty(projectInfos.packageManager)
})
