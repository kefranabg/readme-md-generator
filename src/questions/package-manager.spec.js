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

  it('should not show question for a non JS Project', () => {
    const projectInfos = { isJSProject: false, packageManager: undefined }
    const result = askPackageManager(projectInfos).when(projectInfos)

    expect(result).toBe(false)
  })

  it('should not show question when package manager has already been detected', () => {
    const projectInfos = { isJSProject: true, packageManager: 'yarn' }
    const result = askPackageManager(projectInfos).when(projectInfos)

    expect(result).toBe(false)
  })

  it('should show question when package manager is undefined and if project is JS', () => {
    const projectInfos = { isJSProject: true, packageManager: undefined }
    const result = askPackageManager(projectInfos).when(projectInfos)

    expect(result).toBe(true)
  })
})
