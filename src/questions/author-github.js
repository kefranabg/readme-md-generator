const { cleanSocialNetworkUsername } = require('../utils')

module.exports = projectInfos => ({
  type: 'input',
  message: '👤  Github username (use empty value to skip)',
  name: 'authorGithubUsername',
  default: projectInfos.githubUsername,
  filter: cleanSocialNetworkUsername
})
