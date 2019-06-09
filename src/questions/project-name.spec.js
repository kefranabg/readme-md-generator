const askProjectDocumentationUrl = require('./project-documentation-url')

describe('askProjectDocumentationUrl', () => {
  it('should return correct question format', () => {
    const documentationUrl =
      'https://github.com/kefranabg/readme-md-generator/blob/master/README.md'
    const projectInfos = { documentationUrl }

    const result = askProjectDocumentationUrl(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '📘  Project documentation url (use empty value to skip)',
      name: 'projectDocumentationUrl',
      default: documentationUrl
    })
  })
})
