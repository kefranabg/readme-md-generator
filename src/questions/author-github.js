const { cleanSocialNetworkUsername } = require('../utils')

module.exports = projectInfos => ({
  type: 'input',
  message: '👤  GitHub username (comma to split, empty to skip)',
  name: 'authorGithubUsername',
  default: projectInfos.githubUsername,
  filter: cleanSocialNetworkUsername
})
