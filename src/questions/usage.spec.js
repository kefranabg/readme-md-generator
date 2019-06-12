const askUsage = require('./usage')

describe('askUsage', () => {
  it('should return correct question format', () => {
    const usage = 'npm start'
    const projectInfos = { usage }

    const result = askUsage(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '🚀  Usage command or instruction (use empty value to skip)',
      name: 'usage',
      default: usage
    })
  })
})
