const askContributing = require('./contributing')

describe('askContributing', () => {
  it('should return correct question format', () => {
    const contributingUrl =
      'https://github.com/kefranabg/readme-md-generator/issues'
    const projectInfos = { contributingUrl }

    const result = askContributing(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '🔧  Issues page url (use empty value to skip)',
      name: 'contributingUrl',
      default: contributingUrl
    })
  })
})
