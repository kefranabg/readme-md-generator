const isEmpty = require('lodash/isEmpty')

module.exports = projectInfos => ({
  type: 'input',
  message: '📝  License url (use empty value to skip)',
  name: 'licenseUrl',
  default: projectInfos.licenseUrl,
  when: answersContext => !isEmpty(answersContext.licenseName)
})
