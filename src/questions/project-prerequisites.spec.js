const askProjectPrerequisites = require('./project-prerequisites')

describe('askProjectPrerequisites', () => {
  it('should return correct question format', () => {
    const engines = {
      npm: '>=5.5.0',
      node: '>= 9.3.0'
    }
    const projectInfos = { engines }

    const result = askProjectPrerequisites(projectInfos)

    expect(result).toEqual(
      expect.objectContaining({
        type: 'checkbox',
        message: '⚠️  Project prerequisites',
        name: 'projectPrerequisites',
        choices: [
          {
            checked: true,
            name: 'npm >=5.5.0',
            value: { name: 'npm', value: '>=5.5.0' }
          },
          {
            checked: true,
            name: 'node >= 9.3.0',
            value: { name: 'node', value: '>= 9.3.0' }
          }
        ]
      })
    )
  })

  it('should not show the question when engines property is empty object', () => {
    const projectInfos = { engines: {} }

    const question = askProjectPrerequisites(projectInfos)
    const result = question.when()

    expect(result).toEqual(false)
  })

  it('should not show the question when engines property is not defined', () => {
    const projectInfos = {}

    const question = askProjectPrerequisites(projectInfos)
    const result = question.when()

    expect(result).toEqual(false)
  })

  it('should show the question when engines property is defined and not empty', () => {
    const projectInfos = {
      engines: {
        node: '>=10'
      }
    }

    const question = askProjectPrerequisites(projectInfos)
    const result = question.when()

    expect(result).toEqual(true)
  })
})
