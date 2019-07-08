module.exports = () => ({
  type: 'input',
  message: '🐦  Twitter username (use empty value to skip)',
  name: 'authorTwitterUsername',
  transform: input => input.replace(/^@/, '')
})
