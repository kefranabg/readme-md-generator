const askProjectVersion = require('./project-version')

describe('askProjectVersion', () => {
  it('should return correct question format', () => {
    const version = '1.0.0'
    const projectInfos = { version }

    const result = askProjectVersion(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: 'ℹ️  Project version (use empty value to skip)',
      name: 'projectVersion',
      default: version
    })
  })
})
