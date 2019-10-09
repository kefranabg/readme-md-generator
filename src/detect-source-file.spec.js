const { getSourceFile } = require('./detect-source-file')

jest.mock('inquirer', () => ({
  prompt: jest.fn(() => ({
    sourceFile: 'package.json'
  }))
}))

describe('getSourceFile', () => {
  it('should return detected file', async () => {
    const result = await getSourceFile(['package.json'])
    expect(result).toEqual('package.json')
  })

  it('should return no file', async () => {
    const result = await getSourceFile(['pom.xml'])
    expect(result).toEqual(undefined)
  })

  it('should return first file', async () => {
    const result = await getSourceFile(['package.json', 'package.json'])
    expect(result).toEqual('package.json')
  })
})
