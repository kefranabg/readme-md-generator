const loadJsonFile = require('load-json-file')
const boxen = require('boxen')
const path = require('path')
const fs = require('fs')
const getReposName = require('git-repo-name')

const END_MSG = `README.md was successfully generated.
Thanks for using readme-md-generator!`

const BOXEN_CONFIG = {
  padding: 1,
  margin: { top: 2, bottom: 3 },
  borderColor: 'cyan',
  align: 'center',
  borderStyle: 'double'
}

/**
 * Display end message
 */
const showEndMessage = () => process.stdout.write(boxen(END_MSG, BOXEN_CONFIG))

/**
 * Get package json name property
 *
 * @param {Object} packageJson
 */
const getPackageJsonName = (packageJson = {}) => {
  return packageJson.name || undefined
}

/**
 * Get git repository name
 *
 * @param {String} cwd
 */
const getGitRepositoryName = cwd => {
  try {
    return getReposName.sync({ cwd })
    // eslint-disable-next-line no-empty
  } catch (err) {
    return undefined
  }
}

/**
 * Get project name
 */
const getProjectName = packageJson => {
  const cwd = process.cwd()
  return (
    getPackageJsonName(packageJson) ||
    getGitRepositoryName(cwd) ||
    path.basename(cwd)
  )
}

/**
 * Get package.json content
 */
const getPackageJson = async () => {
  try {
    return await loadJsonFile('package.json')
  } catch (err) {
    return undefined
  }
}

/**
 * Get default question's answers
 *
 * @param {Array} questions
 */
const getDefaultAnswers = questions =>
  questions.reduce(
    (answersContext, question) => ({
      ...answersContext,
      [question.name]: getDefaultAnswer(question, answersContext)
    }),
    {}
  )

/**
 * Get the default answer depending on the question type
 *
 * @param {Object} question
 */
const getDefaultAnswer = (question, answersContext) => {
  if (question.when && !question.when(answersContext)) return undefined

  switch (question.type) {
    case 'input':
      return question.default || ''
    case 'checkbox':
      return question.choices
        .filter(choice => choice.checked)
        .map(choice => choice.value)
    default:
      return undefined
  }
}

/**
 * Check if given file path is valid
 */
const validateFilePath = filePath => {
  let isValidPath = null

  try {
    isValidPath = fs.lstatSync(filePath).isFile()
  } catch (err) {
    isValidPath = false
  }
  if (!isValidPath) {
    process.stdout.write('Path to file is not valid. Please try again.')
    process.exit(1)
  }

  return isValidPath
}

module.exports = {
  getPackageJson,
  showEndMessage,
  getProjectName,
  validateFilePath,
  END_MSG,
  BOXEN_CONFIG,
  getDefaultAnswers,
  getDefaultAnswer
}
