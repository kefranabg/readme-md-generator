/**
 * Clean answer context
 *
 * @param {Object} context
 */
module.exports = context => {
  const cleanBadgeText = text => text.replace(/-/g, '--').replace(/_/g, '__')

  // Why doing this?
  // See https://github.com/kefranabg/readme-md-generator/pull/141
  const licenseName = context.licenseName
    .replace(/-/g, '--')
    .replace(/_/g, '__')
  const projectVersion = cleanBadgeText(context.projectVersion)

  return {
    ...context,
    licenseName,
    projectVersion
  }
}
