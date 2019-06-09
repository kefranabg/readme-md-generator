const askProjectName = require('./project-name')

describe('askProjectName', () => {
  it('should return correct question format', () => {
    const name = 'readme-md-generator'
    const projectInfos = { name }

    const result = askProjectName(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '💡  Project name',
      name: 'projectName',
      default: name
    })
  })
})
