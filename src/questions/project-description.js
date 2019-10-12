module.exports = projectInfos => ({
  type: 'editor',
  message: '📄  Project description',
  name: 'projectDescription',
  default: projectInfos.description
})
