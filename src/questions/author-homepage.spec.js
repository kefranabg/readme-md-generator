const askAuthorHomepage = require('./author-homepage')

describe('askAuthorHomepage', () => {
  it('should return correct question format', () => {
    const authorHomepage = 'authorHomepage'
    const projectInfos = { authorHomepage }

    const result = askAuthorHomepage(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '🏠  Author homepage (use empty value to skip)',
      name: 'authorHomepage',
      default: authorHomepage
    })
  })
})
