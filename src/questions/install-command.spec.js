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

  it('should return undefined for a non JS Project', () => {
    const projectInfos = { isJSProject: false }

    const result = askInstallCommand(projectInfos).default()
    expect(result).toBeUndefined()
  })

  it('should return correct default when lock file is found', () => {
    const testCommand = 'npm install'
    const projectInfos = { isJSProject: true, packageManager: 'npm' }

    const result = askInstallCommand(projectInfos).default()
    expect(result).toBe(testCommand)
  })

  it('should return correct default after user selects a package manager', () => {
    const testCommand = 'yarn install'
    const projectInfos = { isJSProject: true }

    const result = askInstallCommand(projectInfos).default({
      packageManager: 'yarn'
    })
    expect(result).toBe(testCommand)
  })
})
