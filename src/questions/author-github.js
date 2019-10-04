const { cleanSocialNetworkUsername } = require('../utils')

module.exports = projectInfos => ({
  type: 'input',
  message: '👤  GitHub username (use comma if several, use empty value to skip)',
  name: 'authorGithubUsername',
  default: projectInfos.githubUsername,
  filter: cleanSocialNetworkUsername
})
