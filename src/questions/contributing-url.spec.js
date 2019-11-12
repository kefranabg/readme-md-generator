const askContributingUrl = require('./contributing-url')

describe('askContributingUrl', () => {
  it('should return correct question format', () => {
    const contributingUrl =
      'https://github.com/kefranabg/readme-md-generator/blob/master/CONTRIBUTING.md'
    const projectInfos = { contributingUrl }

    const result = askContributingUrl(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '🤝  Contributing guide url (use empty value to skip)',
      name: 'contributingUrl',
      default: contributingUrl
    })
  })
})
