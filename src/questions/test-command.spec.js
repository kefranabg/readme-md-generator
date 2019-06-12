const askTestCommand = require('./test-command')

describe('askTestCommand', () => {
  it('should return correct question format', () => {
    const testCommand = 'npm run test'
    const projectInfos = { testCommand }

    const result = askTestCommand(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '✅  Test command (use empty value to skip)',
      name: 'testCommand',
      default: testCommand
    })
  })
})
