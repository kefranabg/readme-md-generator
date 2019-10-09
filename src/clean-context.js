/**
 * Clean answer context
 *
 * @param {Object} context
 */
module.exports = context => {
  // Why doing this?
  // See https://github.com/kefranabg/readme-md-generator/pull/141
  const licenseName = context.licenseName
    .replace(/-/g, '--')
    .replace(/_/g, '__')

  return {
    ...context,
    licenseName
  }
}
