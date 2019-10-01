const askProjectDemoUrl = require('./project-demo-url')

describe('askProjectDemoUrl', () => {
  it('should return the correct question format', () => {
    const result = askProjectDemoUrl()

    expect(result).toEqual({
      type: 'input',
      message: '✨  Project demo url (use empty value to skip)',
      name: 'projectDemoUrl'
    })
  })
})
