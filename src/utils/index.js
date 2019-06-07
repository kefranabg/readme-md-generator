const util = require('util')
const readFile = util.promisify(require('fs').readFile)
const writeFile = util.promisify(require('fs').writeFile)
const loadJsonFile = require('load-json-file')
const get = require('lodash/get')
const isNil = require('lodash/isNil')
const exec = util.promisify(require('child_process').exec)
const getProjectName = require('project-name')

/**
 * Clean repository url by removing '.git' and 'git+'
 *
 * @param {string} cleanReposUrl
 */
const cleanReposUrl = reposUrl => {
  return reposUrl
    .replace('\n', '')
    .replace('git+', '')
    .replace('.git', '')
}

/**
 * Create readme file from the given readmeContent
 *
 * @param {string} readmeContent
 */
const createReadme = async readmeContent =>
  await writeFile('README.md', readmeContent)

/**
 * Get template content from the given templatePath
 *
 * @param {string} templatePath
 */
const getTemplate = async templatePath => await readFile(templatePath, 'utf8')

/**
 * Get package.json content
 */
const getPackageJson = async () => {
  try {
    return loadJsonFile('package.json')
  } catch (err) {
    return undefined
  }
}

/**
 * Get repository url from pakage json
 *
 * @param {string} reposUrl
 */
const getReposUrlFromPackageJson = async packageJson => {
  const reposUrl = get(packageJson, 'repository.url', undefined)
  return isNil(reposUrl) ? undefined : cleanReposUrl(reposUrl)
}

/**
 * Get repository url from git
 *
 * @param {string} reposUrl
 */
const getReposUrlFromGit = async () => {
  try {
    const url = await exec('git config --get remote.origin.url')
    return cleanReposUrl(url.stdout)
  } catch (err) {
    return undefined
  }
}

/**
 * Get repository url from package.json or git
 *
 * @param {string} packageJson
 */
const getReposUrl = async packageJson =>
  (await getReposUrlFromPackageJson(packageJson)) ||
  (await getReposUrlFromGit())

/**
 * Get repository issues url from package.json or git
 *
 * @param {string} packageJson
 */
const getReposIssuesUrl = async packageJson => {
  let reposIssuesUrl = get(packageJson, 'bugs.url', undefined)

  if (isNil(reposIssuesUrl)) {
    const reposUrl = await getReposUrl()

    if (!isNil(reposUrl)) {
      reposIssuesUrl = `${reposUrl}/issues`
    }
  }

  return reposIssuesUrl
}

const getProjectInfos = async () => {
  const packageJson = await getPackageJson()
  const name = getProjectName() || undefined
  const description = get(packageJson, 'description', undefined)
  const author = get(packageJson, 'author', undefined)
  const repositoryUrl = await getReposUrl(packageJson)
  const contributingUrl = await getReposIssuesUrl(packageJson)

  return {
    name,
    description,
    author,
    repositoryUrl,
    contributingUrl
  }
}

module.exports = {
  getTemplate,
  createReadme,
  getProjectInfos
}
