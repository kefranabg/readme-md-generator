const { getReposIssuesUrl } = require('../utils')

module.exports = async packageJson => ({
  type: 'input',
  message: 'Enter the url of your issues (use empty value to skip)',
  name: 'contributingUrl',
  default: await getReposIssuesUrl(packageJson)
})
