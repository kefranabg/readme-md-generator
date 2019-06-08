module.exports = projectInfos => ({
  type: 'input',
  message: '📘  Project documentation url (use empty value to skip)',
  name: 'projectDocumentationUrl',
  default: projectInfos.documentationUrl
})
