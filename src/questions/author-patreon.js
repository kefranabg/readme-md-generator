const { cleanSocialNetworkUsername } = require('../utils')

module.exports = () => ({
  type: 'input',
  message: '❤️  Patreon username (use empty value to skip)',
  name: 'authorPatreonUsername',
  filter: cleanSocialNetworkUsername
})
