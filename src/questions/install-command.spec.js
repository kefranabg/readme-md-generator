const askInstallCommand = require('./install-command')

describe('askInstallCommand', () => {
  it('should return correct question format', () => {
    const result = askInstallCommand()

    expect(result).toEqual({
      type: 'input',
      message: '📦  Install command (use empty value to skip)',
      name: 'installCommand',
      default: 'npm install'
    })
  })
})
