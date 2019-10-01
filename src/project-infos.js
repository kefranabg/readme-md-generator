const isNil = require('lodash/isNil')
const get = require('lodash/get')
const has = require('lodash/has')
const ora = require('ora')
const { execSync } = require('child_process')

const { getPackageJson, getProjectName } = require('./utils')

const GITHUB_URL = 'https://github.com/'

/**
 * Clean repository url by removing '.git' and 'git+'
 *
 * @param {string} reposUrl
 */
const cleanReposUrl = reposUrl =>
  reposUrl
    .replace('\n', '')
    .replace('git+', '')
    .replace('.git', '')

/**
 * Get repository url from pakage json
 *
 * @param {Object} reposUrl
 */
const getReposUrlFromPackageJson = async packageJson => {
  const reposUrl = get(packageJson, 'repository.url', undefined)
  return isNil(reposUrl) ? undefined : cleanReposUrl(reposUrl)
}

/**
 * Get repository url from git
 */
const getReposUrlFromGit = () => {
  try {
    const stdout = execSync('git config --get remote.origin.url')
    return cleanReposUrl(stdout)
  } catch (err) {
    return undefined
  }
}

/**
 * Get repository url from package.json or git
 *
 * @param {Object} packageJson
 */
const getReposUrl = async packageJson =>
  (await getReposUrlFromPackageJson(packageJson)) || getReposUrlFromGit()

/**
 * Get repository issues url from package.json or git
 *
 * @param {Object} packageJson
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

/**
 * Check if repository is a Github repository
 *
 * @param {string} repositoryUrl
 */
const isGithubRepository = repositoryUrl =>
  !isNil(repositoryUrl) && repositoryUrl.includes(GITHUB_URL)

/**
 * Get github username from repository url
 *
 * @param {string} repositoryUrl
 */
const getGithubUsernameFromRepositoryUrl = repositoryUrl =>
  repositoryUrl.replace(GITHUB_URL, '').split('/')[0]

/**
 * Get license url from github repository url
 *
 * @param {string} repositoryUrl
 */
const getLicenseUrlFromGithubRepositoryUrl = repositoryUrl =>
  `${repositoryUrl}/blob/master/LICENSE`

const getReadmeUrlFromGithubRepositoryUrl = repositoryUrl =>
  `${repositoryUrl}#readme`

/**
 * Get project author name from package.json
 *
 * @param packageJson
 * @returns {string} authorName
 */
const getAuthorName = packageJson => {
  if (has(packageJson, 'author.name')) {
    return get(packageJson, 'author.name', undefined)
  }

  if (has(packageJson, 'author') && typeof packageJson.author === 'string') {
    return get(packageJson, 'author', undefined)
  }

  return undefined
}

/**
 * Get project informations from git and package.json
 */
const getProjectInfos = async () => {
  const spinner = ora('Gathering project infos').start()

  const packageJson = await getPackageJson()
  const name = getProjectName(packageJson)
  const description = get(packageJson, 'description', undefined)
  const engines = get(packageJson, 'engines', undefined)
  const author = getAuthorName(packageJson)
  const version = get(packageJson, 'version', undefined)
  const licenseName = get(packageJson, 'license', undefined)
  const homepage = get(packageJson, 'homepage', undefined)
  const usage = has(packageJson, 'scripts.start') ? 'npm run start' : undefined
  const testCommand = has(packageJson, 'scripts.test')
    ? 'npm run test'
    : undefined
  const repositoryUrl = await getReposUrl(packageJson)
  const contributingUrl = await getReposIssuesUrl(packageJson)
  const isGithubRepos = isGithubRepository(repositoryUrl)
  const documentationUrl = isGithubRepos
    ? getReadmeUrlFromGithubRepositoryUrl(repositoryUrl)
    : undefined
  const githubUsername = isGithubRepos
    ? getGithubUsernameFromRepositoryUrl(repositoryUrl)
    : undefined
  const licenseUrl = isGithubRepos
    ? getLicenseUrlFromGithubRepositoryUrl(repositoryUrl)
    : undefined

  spinner.succeed('Project infos gathered')

  return {
    name,
    description,
    version,
    author,
    homepage,
    repositoryUrl,
    contributingUrl,
    githubUsername,
    engines,
    licenseName,
    licenseUrl,
    documentationUrl,
    isGithubRepos,
    usage,
    testCommand
  }
}

module.exports = {
  getProjectInfos
}
