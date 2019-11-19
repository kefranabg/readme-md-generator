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

    expect(result).toEqual(expect.objectContaining(expectedQuestion))
  })

  it('should return false for a non JS Project', () => {
    const projectInfos = { isJSProject: false, packageManager: undefined }
    const result = askPackageManager(projectInfos).when(projectInfos)

    expect(result).toBe(false)
  })

  it('should return false for when package manager is undefined', () => {
    const projectInfos = { isJSProject: true, packageManager: undefined }
    const result = askPackageManager(projectInfos).when(projectInfos)

    expect(result).toBe(true)
  })
})
