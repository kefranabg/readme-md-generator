const askProjectDescription = require('./project-description')

describe('askProjectDescription', () => {
  it('should return correct question format', () => {
    const description = 'description'
    const projectInfos = { description }

    const result = askProjectDescription(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '📄  Project description',
      name: 'projectDescription',
      default: description
    })
  })
})
