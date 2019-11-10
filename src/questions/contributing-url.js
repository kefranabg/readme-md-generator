module.exports = projectInfos => ({
  type: 'input',
  message: '📄  Contributing guide url (use empty value to skip)',
  name: 'contributingUrl',
  default: projectInfos.contributingUrl
})
