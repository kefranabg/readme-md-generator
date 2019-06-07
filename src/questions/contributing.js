module.exports = packageJson => ({
  type: 'input',
  message: 'Enter the url of your issues (use empty value to skip)',
  name: 'contributingUrl',
  default: packageJson.contributingUrl
})
