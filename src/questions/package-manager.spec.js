const askPackageManager = require('./package-manager')

const expectedQuestion = {
  type: 'list',
  message: '📦  Choose Package Manager ',
  name: 'packageManager',
  choices: [
    {
      name: 'npm',
      value: 'npm'
    },
    {
      name: 'yarn',
      value: 'yarn'
    }
  ]
}

describe('askPackageManager', () => {
  it('should return correct question format when package manager is undefined', () => {
    const projectInfos = { packageManager: undefined }
    const result = askPackageManager(projectInfos)

    expect(result).toEqual(expectedQuestion)
  })

  it('should return null when package manager value is passed', () => {
    const projectInfos = { packageManager: 'npm' }
    const result = askPackageManager(projectInfos)

    expect(result).toBeNull()
  })
})
