module.exports = projectInfos => ({
  type: 'input',
  message: '📦  Install command (use empty value to skip)',
  name: 'installCommand',
  default: projectInfos.isJSProject
    ? `${projectInfos.packageManager} install`
    : undefined
})
