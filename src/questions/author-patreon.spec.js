const askPatreonUsername = require('./author-patreon')

describe('askPatreonUsername', () => {
  it('should return correct question format', () => {
    const result = askPatreonUsername()

    expect(result).toEqual({
      type: 'input',
      message: '❤️  Patreon username (use empty value to skip)',
      name: 'authorPatreonUsername'
    })
  })
})
