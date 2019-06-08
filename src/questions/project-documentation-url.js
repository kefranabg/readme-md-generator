module.exports = projectInfos => ({
  type: 'input',
  message: '📘  Project documenration url (use empty value to skip)',
  name: 'projectDocumentationUrl',
  default: projectInfos.documentationUrl
})
