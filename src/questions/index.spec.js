const questions = require('./')

describe('questions', () => {
  it('should export questions in the correct order', () => {
    const questionsNameOrder = Object.keys(questions)

    expect(questionsNameOrder).toEqual([
      'askProjectName',
      'askProjectVersion',
      'askProjectDescription',
      'askPackageManager',
      'askProjectHomepage',
      'askProjectDemoUrl',
      'askProjectDocumentationUrl',
      'askAuhtorName',
      'askAuthorGithub',
      'askAuthorWebsite',
      'askAuthorTwitter',
      'askAuthorLinkedIn',
      'askAuthorPatreon',
      'askProjectPrerequisites',
      'askLicenseName',
      'askLicenseUrl',
      'askIssuesUrl',
      'askContributingUrl',
      'askInstallCommand',
      'askUsage',
      'askTestCommand'
    ])
  })
})
