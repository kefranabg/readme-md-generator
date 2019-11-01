module.exports = projectInfos => ({
  type: 'input',
  message: '📦  Install command (use empty value to skip)',
  name: 'installCommand',
  default: projectInfos.isJSProject ? 'npm install' : undefined
})
