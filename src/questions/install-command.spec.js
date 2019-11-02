const askInstallCommand = require('./install-command')

describe('askInstallCommand', () => {
  it('should return correct question format when project lang is js', () => {
    const projectInfos = { isJSProject: true }
    const result = askInstallCommand(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '📦  Install command (use empty value to skip)',
      name: 'installCommand',
      default: 'npm install'
    })
  })

  it('should return correct question format when project lang is not js', () => {
    const projectInfos = { isJSProject: false }
    const result = askInstallCommand(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '📦  Install command (use empty value to skip)',
      name: 'installCommand',
      default: undefined
    })
  })
})
