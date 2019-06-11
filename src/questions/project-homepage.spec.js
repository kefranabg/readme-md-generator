const askProjectHomepage = require('./project-homepage')

describe('askProjectHomepage', () => {
  it('should return correct question format', () => {
    const homepage = 'homepage'
    const projectInfos = { homepage }

    const result = askProjectHomepage(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '🏠  Project homepage (use empty value to skip)',
      name: 'projectHomepage',
      default: homepage
    })
  })
})
