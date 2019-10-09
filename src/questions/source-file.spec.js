const askSourceFile = require('./source-file')

describe('askSourceFile', () => {
  it('should return correct question format', () => {
    const files = ['package.xml']
    const result = askSourceFile(files)

    expect(result).toEqual({
      type: 'list',
      message: '📄  Several supported files found. Which one should be used?',
      name: 'sourceFile',
      choices: files
    })
  })
})
