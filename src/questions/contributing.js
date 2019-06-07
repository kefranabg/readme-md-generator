module.exports = packageJson => ({
  type: 'input',
  message: '🔧  Issues page url (use empty value to skip)',
  name: 'contributingUrl',
  default: packageJson.contributingUrl
})
