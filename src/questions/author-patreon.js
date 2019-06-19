const isEmpty = require('lodash/isEmpty')

module.exports = (projectInfos, answersContext) =>
  isEmpty(answersContext.authorName)
  ? undefined
  : {
      type: 'input',
      message: '👤  Patreon username (use empty value to skip)',
      name: 'authorPatreonUsername',
      default: projectInfos.patreonUsername
    }
