const askMatrixUsername = require('./author-matrix')

describe('askMatrixUsername', () => {
  it('should return correct question format', () => {
    const result = askMatrixUsername()
    expect(result).toEqual({
      type: 'input',
      message: '[m] ️Matrix MXID (use empty value to skip)',
      name: 'authorMatrixUsername'
    })
  })
})
