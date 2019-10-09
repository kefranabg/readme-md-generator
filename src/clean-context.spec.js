const cleanContext = require('./clean-context')

describe('cleanContext', () => {
  it('should replace licenseName - and _ characters by -- and __', () => {
    const context = { licenseName: 'Apache-2_0' }
    const cleanedContext = { licenseName: 'Apache--2__0' }

    const result = cleanContext(context)

    expect(result).toEqual(cleanedContext)
  })
})
