module.exports = supportedFiles => ({
  type: 'list',
  message: '📄  Several supported files found. Which one should be used?',
  name: 'sourceFile',
  choices: supportedFiles
})
