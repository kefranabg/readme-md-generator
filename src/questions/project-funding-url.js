module.exports = projectInfos => ({
  type: 'input',
  message: '💸  Project funding url (use empty value to skip)',
  name: 'projectFundingUrl',
  default: projectInfos.fundingUrl
})
