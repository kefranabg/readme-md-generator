const askProjectDemoUrl = require('./project-demo-url')

describe('askProjectDemoUrl', () => {
  it('should return the correct question format', () => {
    const demoUrl = 'demoUrl'
    const projectInfos = { demoUrl }

    const result = askProjectDemoUrl(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '✨  Project demo url (use empty value to skip)',
      name: 'projectDemoUrl',
      default: demoUrl
    })
  })
})
