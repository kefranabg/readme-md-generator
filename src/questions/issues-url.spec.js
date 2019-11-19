const askIssues = require('./issues-url')

describe('askIssues', () => {
  it('should return correct question format', () => {
    const issuesUrl = 'https://github.com/kefranabg/readme-md-generator/issues'
    const projectInfos = { issuesUrl }

    const result = askIssues(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '🔧  Issues page url (use empty value to skip)',
      name: 'issuesUrl',
      default: issuesUrl
    })
  })
})
