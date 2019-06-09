const askProjectPrerequisites = require('./project-prerequisites')

describe('askProjectPrerequisites', () => {
  it('should return correct question format', () => {
    const engines = {
      npm: '>=5.5.0',
      node: '>=9.3.0'
    }
    const projectInfos = { engines }

    const result = askProjectPrerequisites(projectInfos)

    expect(result).toEqual({
      type: 'checkbox',
      message: '⚠️  Project prerequisites',
      name: 'projectPrerequisites',
      choices: [
        {
          checked: true,
          name: 'npm >=5.5.0',
          value: 'npm >=5.5.0'
        },
        {
          checked: true,
          name: 'node >=9.3.0',
          value: 'node >=9.3.0'
        }
      ]
    })
  })

  it('should return undefined when engines property is empty object', () => {
    const engines = {}
    const projectInfos = { engines }

    const result = askProjectPrerequisites(projectInfos)

    expect(result).toEqual(undefined)
  })

  it('should return undefined when engines property is not defined', () => {
    const projectInfos = {}

    const result = askProjectPrerequisites(projectInfos)

    expect(result).toEqual(undefined)
  })
})
