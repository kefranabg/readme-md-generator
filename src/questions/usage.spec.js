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

  it('should return undefined default answer when package manager does not exists', () => {
    const projectInfos = { hasStartCommand: true }

    const result = askUsage(projectInfos).default({
      packageManager: undefined
    })

    expect(result).toBeUndefined()
  })

  it('should return undefined default answer when start command does not exists', () => {
    const projectInfos = { hasStartCommand: false }

    const result = askUsage(projectInfos).default({
      packageManager: 'yarn'
    })

    expect(result).toBeUndefined()
  })

  it('should return correct default answer when start command and packageManager exists', () => {
    const projectInfos = { hasStartCommand: true }

    const result = askUsage(projectInfos).default({
      packageManager: 'yarn'
    })

    expect(result).toEqual('yarn run start')
  })
})
