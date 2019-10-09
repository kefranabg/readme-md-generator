const { getSourceFile } = require('./detect-source-file')

describe('getSourceFile', () => {
  it('should return detected file', async () => {
    const result = await getSourceFile()
    expect(result).toEqual('package.json')
  })
})
