const askLicenseUrl = require('./license-url')

describe('askLicenseUrl', () => {
  it('should return correct question format', () => {
    const licenseUrl =
      'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE'
    const projectInfos = { licenseUrl }
    const answersContext = { licenseName: 'MIT' }

    const result = askLicenseUrl(projectInfos, answersContext)

    expect(result).toEqual({
      type: 'input',
      message: '🔒  License url (use empty value to skip)',
      name: 'licenseUrl',
      default: licenseUrl
    })
  })

  it('should return undefined', () => {
    const licenseUrl =
      'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE'
    const projectInfos = { licenseUrl }
    const answersContext = { licenseName: '' }

    const result = askLicenseUrl(projectInfos, answersContext)

    expect(result).toBe(undefined)
  })
})
