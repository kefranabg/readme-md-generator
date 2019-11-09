const askAuthorLinkedIn = require('./author-linkedin')

describe('askAuthorLinkedIn', () => {
  it('should return correct question format', () => {
    const result = askAuthorLinkedIn()

    expect(result).toEqual({
      type: 'input',
      message: '💼  LinkedIn username (use empty value to skip)',
      name: 'authorLinkedInUsername',
      filter: expect.any(Function)
    })
  })
})
