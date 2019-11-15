const loadJsonFile = require('load-json-file')
const boxen = require('boxen')
const path = require('path')
const getReposName = require('git-repo-name')
const fetch = require('node-fetch')
const { isNil } = require('lodash')

const realPathBasename = path.basename
const realGetReposNameSync = getReposName.sync

const {
  getPackageJson,
  showEndMessage,
  getProjectName,
  END_MSG,
  BOXEN_CONFIG,
  getDefaultAnswer,
  getDefaultAnswers,
  cleanSocialNetworkUsername,
  isProjectAvailableOnNpm,
  getAuthorWebsiteFromGithubAPI
} = require('./utils')

jest.mock('load-json-file')
jest.mock('boxen')
jest.mock('node-fetch')

describe('utils', () => {
  describe('getPackageJson', () => {
    const packageJsonContent = {
      name: 'readme-md-cli'
    }

    it('should return package.json content', async () => {
      loadJsonFile.mockReturnValueOnce(Promise.resolve(packageJsonContent))

      const result = await getPackageJson()

      expect(result).toEqual(packageJsonContent)
    })

    it('should return undefined', async () => {
      loadJsonFile.mockImplementationOnce(() => {
        throw new Error('ERROR')
      })

      const result = await getPackageJson()

      expect(result).toBe(undefined)
    })
  })

  describe('showEndMessage', () => {
    boxen.mockReturnValue(END_MSG)

    it('should call boxen with correct parameters', () => {
      showEndMessage()

      expect(boxen).toHaveBeenCalledTimes(1)
      expect(boxen).toHaveBeenCalledWith(END_MSG, BOXEN_CONFIG)
    })

    it('should call process.stdout.write with correct parameters', () => {
      process.stdout.write = jest.fn()

      showEndMessage()

      expect(process.stdout.write).toHaveBeenCalledTimes(1)
      expect(process.stdout.write).toHaveBeenCalledWith(END_MSG)
    })
  })

  describe('getProjectName', () => {
    const projectName = 'readme-md-generator'

    beforeEach(() => {
      path.basename = jest.fn(() => projectName)
      getReposName.sync = jest.fn()
    })

    afterEach(() => {
      path.basename = realPathBasename
      getReposName.sync = realGetReposNameSync
    })

    it('should return package.json name prop when defined', () => {
      const packageJson = { name: projectName }
      getReposName.sync.mockReturnValue('readme-md-generator')

      const result = getProjectName(packageJson)

      expect(result).toEqual(projectName)
      expect(getReposName.sync).not.toHaveBeenCalled()
      expect(path.basename).not.toHaveBeenCalled()
    })

    it('should return git repos when package.json it is not defined', () => {
      const packageJson = undefined
      getReposName.sync.mockReturnValue('readme-md-generator')

      const result = getProjectName(packageJson)

      expect(result).toEqual(projectName)
      expect(getReposName.sync).toHaveBeenCalled()
      expect(path.basename).not.toHaveBeenCalled()
    })

    it('should return folder basename when package.json and git repos name is undefined', () => {
      const packageJson = undefined
      getReposName.sync.mockImplementation(() => {
        throw new Error('error')
      })

      const result = getProjectName(packageJson)

      expect(result).toEqual(projectName)
      expect(getReposName.sync).toHaveBeenCalled()
      expect(path.basename).toHaveBeenCalled()
    })
  })

  describe('getDefaultAnswer', () => {
    it('should handle input prompts correctly', async () => {
      const question = { type: 'input', default: 'default' }
      const result = await getDefaultAnswer(question)
      expect(result).toEqual(question.default)
    })

    it('should handle choices prompts correctly', async () => {
      const value = { name: 'name', value: 'value' }
      const question = {
        type: 'checkbox',
        choices: [{ value, checked: true }, { checked: false }]
      }
      const result = await getDefaultAnswer(question)

      expect(result).toEqual([value])
    })

    it('should return empty string for non-defaulted fields', async () => {
      const question = { type: 'input' }
      const result = await getDefaultAnswer(question)

      expect(result).toEqual('')
    })

    it('should return undefined for invalid types', async () => {
      const question = { type: 'invalid' }
      const result = await getDefaultAnswer(question)

      expect(result).toEqual(undefined)
    })

    it('should return undefined if when function is defined and return false', async () => {
      const answersContext = {}
      const question = {
        type: 'input',
        when: ansewersContext => !isNil(ansewersContext.licenseUrl)
      }

      const result = await getDefaultAnswer(question, answersContext)

      expect(result).toEqual(undefined)
    })

    describe('isProjectAvailableOnNpm', () => {
      it('should return true if project is available on npm', () => {
        const result = isProjectAvailableOnNpm('readme-md-generator')

        expect(result).toBe(true)
      })

      it('should return false if project is not available on npm', () => {
        const result = isProjectAvailableOnNpm('bento-starter')

        expect(result).toBe(false)
      })
    })

    it('should return correct value if when function is defined and return true', async () => {
      const answersContext = { licenseUrl: 'licenseUrl' }
      const question = {
        type: 'input',
        default: 'default',
        when: ansewersContext => !isNil(ansewersContext.licenseUrl)
      }

      const result = await getDefaultAnswer(question, answersContext)

      expect(result).toEqual('default')
    })
  })

  describe('getDefaultAnswers', () => {
    it('should return default answers from questions', async () => {
      const questions = [
        {
          type: 'input',
          name: 'questionOne',
          default: 'answer 1'
        },
        {
          type: 'input',
          name: 'questionTwo',
          default: 'answer 2'
        }
      ]

      const result = await getDefaultAnswers(questions)

      expect(result).toEqual({
        questionOne: 'answer 1',
        questionTwo: 'answer 2'
      })
    })
  })

  describe('cleanSocialNetworkUsername', () => {
    it('should remove prefixed @', () => {
      expect(cleanSocialNetworkUsername('@Slashgear_')).toEqual('Slashgear_')
    })

    it('should return the same string when string is not prefixed', () => {
      expect(cleanSocialNetworkUsername('Slashgear_')).toEqual('Slashgear_')
    })
  })

  describe('getAuthorWebsiteFromGithubAPI', () => {
    it('should return author website url when it exists', async () => {
      const expectedAuthorWebsite = 'https://www.franck-abgrall.me/'
      fetch.mockReturnValueOnce(
        Promise.resolve({
          json: () => Promise.resolve({ blog: expectedAuthorWebsite })
        })
      )

      const githubUsername = 'kefranabg'
      const authorWebsite = await getAuthorWebsiteFromGithubAPI(githubUsername)
      expect(authorWebsite).toEqual(expectedAuthorWebsite)
    })

    it('should return undefined if author website url does not exist', async () => {
      fetch.mockReturnValueOnce(Promise.resolve({ blog: '' }))
      const githubUsername = 'kefranabg'
      const authorWebsite = await getAuthorWebsiteFromGithubAPI(githubUsername)
      expect(authorWebsite).toEqual(undefined)
    })

    it('should return undefined if there is an error', async () => {
      fetch.mockImplementationOnce(() => {
        throw new Error('ERROR')
      })
      const githubUsername = 'kefranabg'
      const authorWebsite = await getAuthorWebsiteFromGithubAPI(githubUsername)
      expect(authorWebsite).toEqual(undefined)
    })
  })
})
