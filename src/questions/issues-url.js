module.exports = packageJson => ({
  type: 'input',
  message: '🔧  Issues page url (use empty value to skip)',
  name: 'issuesUrl',
  default: packageJson.issuesUrl
})
