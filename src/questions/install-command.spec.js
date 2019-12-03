const askInstallCommand = require('./install-command')

describe('askInstallCommand', () => {
  it('should return correct question format', () => {
    const result = askInstallCommand()
    expect(result).toEqual(
      expect.objectContaining({
        type: 'input',
        message: '📦  Install command (use empty value to skip)',
        name: 'installCommand'
      })
    )
  })

  it('should return undefined default answer when package manager is not defined', () => {
    const projectInfos = {}

    const result = askInstallCommand(projectInfos).default({
      packageManager: undefined
    })

    expect(result).toBeUndefined()
  })

  it('should return correct default answer when package manager is defined', () => {
    const projectInfos = {}

    const result = askInstallCommand(projectInfos).default({
      packageManager: 'yarn'
    })

    expect(result).toEqual('yarn install')
  })
})
