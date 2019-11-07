const { cleanSocialNetworkUsername } = require('../utils')

module.exports = () => ({
  type: 'input',
  message: '🕴  LinkedIn username (use empty value to skip)',
  name: 'authorLinkedInUsername',
  filter: cleanSocialNetworkUsername
})
