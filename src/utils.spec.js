const loadJsonFile = require('load-json-file')
const boxen = require('boxen')
const path = require('path')
const getReposName = require('git-repo-name')
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
  isProjectAvailableOnNpm
} = require('./utils')

jest.mock('load-json-file')
jest.mock('boxen')

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
    it('should handle input prompts correctly', () => {
      const question = { type: 'input', default: 'default' }
      const result = getDefaultAnswer(question)
      expect(result).toEqual(question.default)
    })

    it('should handle choices prompts correctly', () => {
      const value = { name: 'name', value: 'value' }
      const question = {
        type: 'checkbox',
        choices: [{ value, checked: true }, { checked: false }]
      }
      const result = getDefaultAnswer(question)

      expect(result).toEqual([value])
    })

    it('should return empty string for non-defaulted fields', () => {
      const question = { type: 'input' }
      const result = getDefaultAnswer(question)

      expect(result).toEqual('')
    })

    it('should return undefined for invalid types', () => {
      const question = { type: 'invalid' }
      const result = getDefaultAnswer(question)

      expect(result).toEqual(undefined)
    })

    it('should return undefined if when function is defined and return false', () => {
      const answersContext = {}
      const question = {
        type: 'input',
        when: ansewersContext => !isNil(ansewersContext.licenseUrl)
      }

      const result = getDefaultAnswer(question, answersContext)

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

    it('should return correct value if when function is defined and return true', () => {
      const answersContext = { licenseUrl: 'licenseUrl' }
      const question = {
        type: 'input',
        default: 'default',
        when: ansewersContext => !isNil(ansewersContext.licenseUrl)
      }

      const result = getDefaultAnswer(question, answersContext)

      expect(result).toEqual('default')
    })
  })

  describe('getDefaultAnswers', () => {
    it('should return default answers from questions', () => {
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

      const result = getDefaultAnswers(questions)

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
})
