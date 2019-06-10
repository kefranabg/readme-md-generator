const isEmpty = require('lodash/isEmpty')

module.exports = (projectInfos, answersContext) =>
  isEmpty(answersContext.licenseName)
    ? undefined
    : {
        type: 'input',
        message: '📝  License url (use empty value to skip)',
        name: 'licenseUrl',
        default: projectInfos.licenseUrl
      }
