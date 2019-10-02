const isNil = require('lodash/isNil')
const get = require('lodash/get')
const has = require('lodash/has')
const ora = require('ora')
const { execSync } = require('child_process')

const { getPackageJson, getProjectName, getPomXml } = require('./utils')

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
    return cleanReposUrl(stdout.toString())
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
 * Get repository issues url from package.json or pom.xml or git
 *
 * @param {Object} configJson
 */
const getReposIssuesUrl = async configJson => {
  let reposIssuesUrl = get(configJson, 'bugs.url', undefined) || get(configJson, 'issueManagement[0].url', undefined)

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
 * Get infos from package.json
 *
 * @returns {Object} infos
 */
const getInfosFromPackageJson = async () => {
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

  return {
    name,
    description,
    version,
    author,
    homepage,
    repositoryUrl,
    contributingUrl,
    engines,
    licenseName,
    usage,
    testCommand
  }
}

/**
 * Get infos from pom.xml
 *
 * @returns {Object} infos
 */
const getInfosFromPomXml = async () => {
  const pomXml = await getPomXml()
  const name = getProjectName(pomXml)
  const description = get(pomXml, 'description', undefined)
  const author = get(pomXml, 'contributors[0].contributor[0].name', undefined)
    || get(pomXml, 'developers[0].developer[0].name', undefined)
  const version = get(pomXml, 'version', undefined)
  const licenseName = get(pomXml, 'licenses[0].license[0].name', undefined)
  const licenseUrl = get(pomXml, 'licenses[0].license[0].url', undefined)
  const homepage = get(pomXml, 'url', undefined)
  const testCommand = 'mvn clean test'
  const installCommand = 'mvn clean install'
  const repositoryUrl = getReposUrlFromGit()
  const contributingUrl = await getReposIssuesUrl(pomXml)

  return {
    name,
    description,
    version,
    author,
    homepage,
    repositoryUrl,
    contributingUrl,
    licenseName,
    licenseUrl,
    testCommand,
    installCommand
  }
}

/**
 * Get project informations from git and package.json or pom.xml
 */
const getProjectInfos = async (usePomXml) => {
  const spinner = ora('Gathering project infos').start()

  const infosFromConfigFile = usePomXml
    ? await getInfosFromPomXml()
    : await getInfosFromPackageJson()
  const isGithubRepos = isGithubRepository(infosFromConfigFile.repositoryUrl)
  const documentationUrl = isGithubRepos
    ? getReadmeUrlFromGithubRepositoryUrl(infosFromConfigFile.repositoryUrl)
    : undefined
  const githubUsername = isGithubRepos
    ? getGithubUsernameFromRepositoryUrl(infosFromConfigFile.repositoryUrl)
    : undefined
  const licenseUrl = infosFromConfigFile.licenseUrl || (isGithubRepos
    ? getLicenseUrlFromGithubRepositoryUrl(infosFromConfigFile.repositoryUrl)
    : undefined)

  spinner.succeed('Project infos gathered')

  return {
    ...infosFromConfigFile,
    githubUsername,
    licenseUrl,
    documentationUrl,
    isGithubRepos
  }
}

module.exports = {
  getProjectInfos
}
