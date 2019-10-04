const questions = require('./')

describe('questions', () => {
  it('should export questions in the correct order', () => {
    const questionsNameOrder = Object.keys(questions)

    expect(questionsNameOrder).toEqual([
      'askProjectName',
      'askProjectVersion',
      'askProjectDescription',
      'askProjectHomepage',
      'askProjectDemoUrl',
      'askProjectDocumentationUrl',
      'askAuhtorName',
      'askAuthorHomepage',
      'askAuthorGithub',
      'askAuthorTwitter',
      'askAuthorPatreon',
      'askProjectPrerequisites',
      'askLicenseName',
      'askLicenseUrl',
      'askContributing',
      'askInstallCommand',
      'askUsage',
      'askTestCommand'
    ])
  })
})
