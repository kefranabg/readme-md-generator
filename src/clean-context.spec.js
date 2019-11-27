const cleanContext = require('./clean-context')

describe('cleanContext', () => {
  it('should replace licenseName and projectVersion - and _ characters by -- and __', () => {
    const context = {
      licenseName: 'Apache-2_0',
      projectVersion: '1.0_0-alpha'
    }
    const cleanedContext = {
      licenseName: 'Apache--2__0',
      projectVersion: '1.0__0--alpha'
    }

    const result = cleanContext(context)

    expect(result).toEqual(cleanedContext)
  })
})
