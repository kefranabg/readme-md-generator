const askAuthorGithub = require('./author-github')

describe('askAuthorGithub', () => {
  it('should return correct question format', () => {
    const githubUsername = 'kefranabg'
    const projectInfos = { githubUsername }

    const result = askAuthorGithub(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '👤  Github username (use empty value to skip)',
      name: 'authorGithubUsername',
      default: githubUsername,
      filter: expect.any(Function)
    })
  })
})
