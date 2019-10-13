const askAuthorWebsite = require('./author-website')

describe('askAuthorWebsite', () => {
  it('should return correct question format', () => {
    const authorWebsite = 'authorWebsite'
    const projectInfos = { authorWebsite }

    const result = askAuthorWebsite(projectInfos)

    expect(result).toEqual(
      expect.objectContaining({
        type: 'input',
        message: '🏠  Author website (use empty value to skip)',
        name: 'authorWebsite'
      })
    )
  })
})
