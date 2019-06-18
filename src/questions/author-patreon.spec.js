const askPatreonUsername = require('./author-patreon')

describe('askPatreonUsername', () => {
  it('should return correct question format', () => {
    const patreonUsername = 'FranckAbgrall'
    const projectInfos = { patreonUsername }
    const answersContext = { authorName: 'Franck Abgrall' }

    const result = askPatreonUsername(projectInfos, answersContext)

    expect(result).toEqual({
      type: 'input',
      message: '👤  Patreon username (use empty value to skip)',
      name: 'authorPatreonUsername',
      default: patreonUsername
    })
  })

  it('should return undefined', () => {
    const patreonUsername = 'FranckAbgrall'
    const projectInfos = { patreonUsername }
    const answersContext = { authorName: 'Franck Abgrall' }

    const result = askPatreonUsername(projectInfos, answersContext)

    expect(result).toBe(undefined)
  })
})
