const askProjectFundingUrl = require('./project-funding-url')

describe('askProjectFunding', () => {
  it('should return correct question format', () => {
    const fundingUrl = 'fundingUrl'
    const projectInfos = { fundingUrl }

    const result = askProjectFundingUrl(projectInfos)

    expect(result).toEqual({
      type: 'input',
      message: '💸  Project funding url (use empty value to skip)',
      name: 'projectFundingUrl',
      default: fundingUrl
    })
  })
})
