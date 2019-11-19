const askTestCommand = require('./test-command')

describe('askTestCommand', () => {
  it('should return correct question format', () => {
    const result = askTestCommand()
    expect(result).toEqual(
      expect.objectContaining({
        type: 'input',
        message: '✅  Test command (use empty value to skip)',
        name: 'testCommand'
      })
    )
  })

  it('should return undefined for a non JS Project', () => {
    const projectInfos = { isJSProject: false }

    const result = askTestCommand(projectInfos).default({
      packageManager: undefined
    })
    expect(result).toBeUndefined()
  })

  it('should return undefined if there is no test script', () => {
    const projectInfos = { testCommand: undefined, isJSProject: true }

    const result = askTestCommand(projectInfos).default({
      packageManager: 'npm'
    })
    expect(result).toBeUndefined()
  })

  it('should return correct default if lock file is found', () => {
    const testCommand = 'npm run test'
    const projectInfos = { testCommand, isJSProject: true }

    const result = askTestCommand(projectInfos).default({
      packageManager: 'npm'
    })
    expect(result).toBe(testCommand)
  })

  it('should return correct default after user selects a package manager', () => {
    const testCommand = 'yarn run test'
    const projectInfos = { testCommand, isJSProject: true }

    const result = askTestCommand(projectInfos).default({
      packageManager: 'yarn'
    })
    expect(result).toBe(testCommand)
  })
})
