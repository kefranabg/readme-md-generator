const askLicenseUrl = require('./license-url')

describe('askLicenseUrl', () => {
  it('should return correct question format', () => {
    const licenseUrl =
      'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE'
    const projectInfos = { licenseUrl }

    const result = askLicenseUrl(projectInfos)

    expect(result).toEqual(
      expect.objectContaining({
        type: 'input',
        message: '📝  License url (use empty value to skip)',
        name: 'licenseUrl',
        default: licenseUrl
      })
    )
  })

  it('should show this question if licenseName is defined', () => {
    const projectInfos = {
      licenseUrl:
        'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE'
    }
    const answersContext = { licenseName: 'MIT' }

    const question = askLicenseUrl(projectInfos)
    const result = question.when(answersContext)

    expect(result).toBe(true)
  })

  it('should not show this question if licenseName is not defined', () => {
    const projectInfos = {
      licenseUrl:
        'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE'
    }
    const answersContext = {}

    const question = askLicenseUrl(projectInfos)
    const result = question.when(answersContext)

    expect(result).toBe(false)
  })
})
