const askUsage = require('./usage')

describe('askUsage', () => {
  it('should return correct question format', () => {
    const result = askUsage()

    expect(result).toEqual(
      expect.objectContaining({
        type: 'input',
        message: '🚀  Usage command or instruction (use empty value to skip)',
        name: 'usage'
      })
    )
  })

  it('should return undefined for a non JS Project', () => {
    const projectInfos = { isJSProject: false }

    const result = askUsage(projectInfos).default({ packageManager: undefined })
    expect(result).toBeUndefined()
  })

  it('should return correct default when lock file is found', () => {
    const usage = 'npm run start'
    const projectInfos = { isJSProject: true }

    const result = askUsage(projectInfos).default({ packageManager: 'npm' })
    expect(result).toBe(usage)
  })

  it('should return correct default after user selects a package manager', () => {
    const usage = 'yarn run start'
    const projectInfos = { isJSProject: true }

    const result = askUsage(projectInfos).default({
      packageManager: 'yarn'
    })
    expect(result).toBe(usage)
  })
})
