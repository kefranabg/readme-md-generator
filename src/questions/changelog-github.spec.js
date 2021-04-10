const askChangelogUrl = require('./changelog-github')

describe('askChangelogUrl', () => {
  it('should return correct question format', () => {
    const changelogUrl =
      'https://github.com/kefranabg/readme-md-generator/blob/master/CHANGELOG.md'
    const projectInfos = { changelogUrl }

    const result = askChangelogUrl(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message:
        '📄  Changelog url. See more info : https://keepachangelog.com/en/1.0.0/ (use empty value to skip)',
      name: 'changelogUrl',
      default: changelogUrl
    })
  })
})
