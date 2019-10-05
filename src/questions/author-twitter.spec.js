const askAuthorTwitter = require('./author-twitter')

describe('askAuthorTwitter', () => {
  it('should return correct question format', () => {
    const result = askAuthorTwitter()

    expect(result).toEqual({
      type: 'input',
      message: '🐦  Twitter username (comma to split, empty to skip)',
      name: 'authorTwitterUsername',
      filter: expect.any(Function)
    })
  })
})
