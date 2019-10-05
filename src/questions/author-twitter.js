const { cleanSocialNetworkUsername } = require('../utils')

module.exports = () => ({
  type: 'input',
  message: '🐦  Twitter username (comma to split, empty to skip)',
  name: 'authorTwitterUsername',
  filter: cleanSocialNetworkUsername
})
