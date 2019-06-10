const askLicenseName = require('./license-name')

describe('askLicenseName', () => {
  it('should return correct question format', () => {
    const licenseName = 'MIT'
    const projectInfos = { licenseName }

    const result = askLicenseName(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '📝  License name (use empty value to skip)',
      name: 'licenseName',
      default: licenseName
    })
  })
})
