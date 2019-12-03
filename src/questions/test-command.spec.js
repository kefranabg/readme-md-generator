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

  it('should return undefined default answer when package manager does not exists', () => {
    const projectInfos = { hasTestCommand: true }

    const result = askTestCommand(projectInfos).default({
      packageManager: undefined
    })

    expect(result).toBeUndefined()
  })

  it('should return undefined default answer when test command does not exists', () => {
    const projectInfos = { hasTestCommand: false }

    const result = askTestCommand(projectInfos).default({
      packageManager: 'yarn'
    })

    expect(result).toBeUndefined()
  })

  it('should return correct default answer when start command and package manager exists', () => {
    const projectInfos = { hasTestCommand: true }

    const result = askTestCommand(projectInfos).default({
      packageManager: 'yarn'
    })

    expect(result).toEqual('yarn run test')
  })
})
