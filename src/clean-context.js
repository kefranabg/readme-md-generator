module.exports = context => {
  // Why doing this?
  // See https://shields.io/ 'Using dash "-" separator' section
  const licenseName = context.licenseName
    .replace(/-/g, '--')
    .replace(/_/g, '__')

  return {
    ...context,
    licenseName
  }
}
