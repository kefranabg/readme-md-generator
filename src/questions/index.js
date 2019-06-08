const askProjectName = require('./project-name')
const askProjectDescription = require('./project-description')
const askAuhtorName = require('./author-name')
const askAuthorGithub = require('./author-github')
const askAuthorTwitter = require('./author-twitter')
const askLicenseName = require('./license-name')
const askLicenseUrl = require('./license-url')
const askContributing = require('./contributing')
const askProjectVersion = require('./project-version')
const askProjectPrerequisites = require('./project-prerequisites')
const askProjectDocumentationUrl = require('./project-documentation-url')

module.exports = {
  askProjectName,
  askProjectDescription,
  askAuhtorName,
  askAuthorGithub,
  askAuthorTwitter,
  askLicenseName,
  askLicenseUrl,
  askContributing,
  askProjectVersion,
  askProjectPrerequisites,
  askProjectDocumentationUrl
}
