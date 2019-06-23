const ora = require('ora')
const childProcess = require('child_process')

const utils = require('./utils')
const { getProjectInfos } = require('./project-infos')

jest.mock('ora')
jest.mock('child_process', () => ({
  execSync: jest.fn()
}))
jest.mock('./utils', () => ({
  getPackageJson: jest.fn(),
  getProjectName: jest.fn(() => 'readme-md-generator')
}))

const succeed = jest.fn()
const fail = jest.fn()

ora.mockReturnValue({
  start: () => ({
    succeed,
    fail
  })
})

describe('projectInfos', () => {
  describe('getProjectInfos', () => {
    it('should call ora with correct parameters', async () => {
      await getProjectInfos()

      expect(ora).toHaveBeenCalledTimes(1)
      expect(ora).toHaveBeenCalledWith('Gathering project infos')
      expect(succeed).toHaveBeenCalledTimes(1)
      expect(succeed).toHaveBeenCalledWith('Project infos gathered')
    })

    it('should return correct infos', async () => {
      const packgeJsonInfos = {
        name: 'readme-md-generator',
        version: '0.1.3',
        description: 'CLI that generates beautiful README.md files.',
        author: 'Franck Abgrall',
        license: 'MIT',
        homepage: 'https://github.com/kefranabg/readme-md-generator',
        repository: {
          type: 'git',
          url: 'git+https://github.com/kefranabg/readme-md-generator.git'
        },
        bugs: {
          url: 'https://github.com/kefranabg/readme-md-generator/issues'
        },
        engines: {
          npm: '>=5.5.0',
          node: '>=9.3.0'
        }
      }
      utils.getPackageJson.mockReturnValueOnce(Promise.resolve(packgeJsonInfos))
      childProcess.execSync.mockReturnValue(
        'https://github.com/kefranabg/readme-md-generator.git'
      )

      const projectInfos = await getProjectInfos()

      expect(projectInfos).toEqual({
        name: 'readme-md-generator',
        description: 'CLI that generates beautiful README.md files.',
        version: '0.1.3',
        author: 'Franck Abgrall',
        repositoryUrl: 'https://github.com/kefranabg/readme-md-generator',
        homepage: 'https://github.com/kefranabg/readme-md-generator',
        contributingUrl:
          'https://github.com/kefranabg/readme-md-generator/issues',
        githubUsername: 'kefranabg',
        engines: {
          npm: '>=5.5.0',
          node: '>=9.3.0'
        },
        licenseName: 'MIT',
        licenseUrl:
          'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE',
        documentationUrl:
          'https://github.com/kefranabg/readme-md-generator#readme',
        isGithubRepos: true,
        usage: undefined,
        testCommand: undefined
      })
    })

    it('should return correct infos when repos is not github', async () => {
      const packgeJsonInfos = {
        name: 'readme-md-generator',
        version: '0.1.3',
        description: 'CLI that generates beautiful README.md files.',
        author: 'Franck Abgrall',
        license: 'MIT',
        homepage: 'https://gitlab.com/kefranabg/readme-md-generator',
        repository: {
          type: 'git',
          url: 'git+https://gitlab.com/kefranabg/readme-md-generator.git'
        },
        bugs: {
          url: 'https://gitlab.com/kefranabg/readme-md-generator/issues'
        },
        engines: {
          npm: '>=5.5.0',
          node: '>=9.3.0'
        }
      }
      utils.getPackageJson.mockReturnValueOnce(Promise.resolve(packgeJsonInfos))
      childProcess.execSync.mockReturnValue(
        'https://github.com/kefranabg/readme-md-generator.git'
      )

      const projectInfos = await getProjectInfos()

      expect(projectInfos).toEqual({
        name: 'readme-md-generator',
        description: 'CLI that generates beautiful README.md files.',
        version: '0.1.3',
        author: 'Franck Abgrall',
        repositoryUrl: 'https://gitlab.com/kefranabg/readme-md-generator',
        contributingUrl:
          'https://gitlab.com/kefranabg/readme-md-generator/issues',
        homepage: 'https://gitlab.com/kefranabg/readme-md-generator',
        githubUsername: undefined,
        engines: {
          npm: '>=5.5.0',
          node: '>=9.3.0'
        },
        licenseName: 'MIT',
        licenseUrl: undefined,
        documentationUrl: undefined,
        isGithubRepos: false,
        usage: undefined,
        testCommand: undefined
      })
    })

    it('should return correct infos when package.json is not defined', async () => {
      utils.getPackageJson.mockReturnValueOnce(Promise.resolve(undefined))
      childProcess.execSync.mockReturnValue(
        'https://github.com/kefranabg/readme-md-generator.git'
      )

      const projectInfos = await getProjectInfos()

      expect(projectInfos).toEqual({
        name: 'readme-md-generator',
        description: undefined,
        version: undefined,
        author: undefined,
        repositoryUrl: 'https://github.com/kefranabg/readme-md-generator',
        contributingUrl:
          'https://github.com/kefranabg/readme-md-generator/issues',
        homepage: undefined,
        githubUsername: 'kefranabg',
        engines: undefined,
        licenseName: undefined,
        licenseUrl:
          'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE',
        documentationUrl:
          'https://github.com/kefranabg/readme-md-generator#readme',
        isGithubRepos: true,
        usage: undefined,
        testCommand: undefined
      })
    })

    it('should return correct infos when repos is not github and package.json are not defined', async () => {
      utils.getPackageJson.mockReturnValueOnce(Promise.resolve(undefined))
      childProcess.execSync.mockReturnValue(
        'https://gitlab.com/kefranabg/readme-md-generator.git'
      )

      const projectInfos = await getProjectInfos()

      expect(projectInfos).toEqual({
        name: 'readme-md-generator',
        description: undefined,
        version: undefined,
        author: undefined,
        repositoryUrl: 'https://gitlab.com/kefranabg/readme-md-generator',
        contributingUrl:
          'https://gitlab.com/kefranabg/readme-md-generator/issues',
        homepage: undefined,
        githubUsername: undefined,
        engines: undefined,
        licenseName: undefined,
        licenseUrl: undefined,
        documentationUrl: undefined,
        isGithubRepos: false,
        usage: undefined,
        testCommand: undefined
      })
    })

    it('should return correct infos when git config and package.json are not defined', async () => {
      utils.getPackageJson.mockReturnValueOnce(Promise.resolve(undefined))
      childProcess.execSync.mockImplementation(() => {
        throw new Error('error')
      })

      const projectInfos = await getProjectInfos()

      expect(projectInfos).toEqual({
        name: 'readme-md-generator',
        description: undefined,
        version: undefined,
        author: undefined,
        repositoryUrl: undefined,
        contributingUrl: undefined,
        homepage: undefined,
        githubUsername: undefined,
        engines: undefined,
        licenseName: undefined,
        licenseUrl: undefined,
        documentationUrl: undefined,
        isGithubRepos: false,
        usage: undefined,
        testCommand: undefined
      })
    })

    it('should return correct infos when git config is not defined', async () => {
      const packgeJsonInfos = {
        name: 'readme-md-generator',
        version: '0.1.3',
        description: 'CLI that generates beautiful README.md files.',
        author: 'Franck Abgrall',
        license: 'MIT',
        homepage: 'https://github.com/kefranabg/readme-md-generator',
        repository: {
          type: 'git',
          url: 'git+https://github.com/kefranabg/readme-md-generator.git'
        },
        bugs: {
          url: 'https://github.com/kefranabg/readme-md-generator/issues'
        },
        engines: {
          npm: '>=5.5.0',
          node: '>=9.3.0'
        }
      }
      utils.getPackageJson.mockReturnValueOnce(Promise.resolve(packgeJsonInfos))
      childProcess.execSync.mockImplementation(() => {
        throw new Error('error')
      })

      const projectInfos = await getProjectInfos()

      expect(projectInfos).toEqual({
        name: 'readme-md-generator',
        description: 'CLI that generates beautiful README.md files.',
        version: '0.1.3',
        author: 'Franck Abgrall',
        repositoryUrl: 'https://github.com/kefranabg/readme-md-generator',
        contributingUrl:
          'https://github.com/kefranabg/readme-md-generator/issues',
        homepage: 'https://github.com/kefranabg/readme-md-generator',
        githubUsername: 'kefranabg',
        engines: {
          npm: '>=5.5.0',
          node: '>=9.3.0'
        },
        licenseName: 'MIT',
        licenseUrl:
          'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE',
        documentationUrl:
          'https://github.com/kefranabg/readme-md-generator#readme',
        isGithubRepos: true,
        usage: undefined,
        testCommand: undefined
      })
    })

    it('should return correct infos when author is defined as an object', async () => {
      const packgeJsonInfos = {
        name: 'readme-md-generator',
        version: '0.1.3',
        description: 'CLI that generates beautiful README.md files.',
        author: {
          name: 'Franck Abgrall',
          email: 'abgrallkefran@gmail.com',
          url: ''
        },
        license: 'MIT',
        homepage: 'https://github.com/kefranabg/readme-md-generator',
        repository: {
          type: 'git',
          url: 'git+https://github.com/kefranabg/readme-md-generator.git'
        },
        bugs: {
          url: 'https://github.com/kefranabg/readme-md-generator/issues'
        },
        engines: {
          npm: '>=5.5.0',
          node: '>=9.3.0'
        }
      }
      utils.getPackageJson.mockReturnValueOnce(Promise.resolve(packgeJsonInfos))
      childProcess.execSync.mockReturnValue(
        'https://github.com/kefranabg/readme-md-generator.git'
      )

      const projectInfos = await getProjectInfos()

      expect(projectInfos).toEqual({
        name: 'readme-md-generator',
        description: 'CLI that generates beautiful README.md files.',
        version: '0.1.3',
        author: 'Franck Abgrall',
        repositoryUrl: 'https://github.com/kefranabg/readme-md-generator',
        homepage: 'https://github.com/kefranabg/readme-md-generator',
        contributingUrl:
          'https://github.com/kefranabg/readme-md-generator/issues',
        githubUsername: 'kefranabg',
        engines: {
          npm: '>=5.5.0',
          node: '>=9.3.0'
        },
        licenseName: 'MIT',
        licenseUrl:
          'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE',
        documentationUrl:
          'https://github.com/kefranabg/readme-md-generator#readme',
        isGithubRepos: true,
        usage: undefined,
        testCommand: undefined
      })
    })
  })
})
