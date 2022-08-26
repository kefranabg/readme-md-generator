const loadJsonFile = require('load-json-file')
const boxen = require('boxen')
const path = require('path')
const getReposName = require('git-repo-name')
const fs = require('fs')

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
const getPackageJsonName = (packageJson = {}) => packageJson.name || undefined
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
 * Returns a boolean whether a file exists or not
 *
 * @param {String} filepath
 * @returns {Boolean}
 */
const doesFileExist = filepath => {
  try {
    return fs.existsSync(filepath)
  } catch (err) {
    return false
  }
}

/**
 * Returns the package manager from the lock file
 *
 * @returns {String} packageManger or undefined
 */
const getPackageManagerFromLockFile = () => {
  const packageLockExists = doesFileExist('package-lock.json')
  const yarnLockExists = doesFileExist('yarn.lock')

  if (packageLockExists && yarnLockExists) return undefined
  if (packageLockExists) return 'npm'
  if (yarnLockExists) return 'yarn'
  return undefined
}

module.exports = {
  getPackageJson,
  showEndMessage,
  getProjectName,
  END_MSG,
  BOXEN_CONFIG,
  getPackageManagerFromLockFile,
  doesFileExist
}
