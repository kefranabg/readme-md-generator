const loadJsonFile = require('load-json-file')
const boxen = require('boxen')
const path = require('path')
const getReposName = require('git-repo-name')

const realPathBasename = path.basename
const realGetReposNameSync = getReposName.sync

const {
  getPackageJson,
  showEndMessage,
  getProjectName,
  END_MSG,
  BOXEN_CONFIG
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

    beforeAll(() => {
      path.basename = jest.fn(() => projectName)
      getReposName.sync = jest.fn()
    })

    afterAll(() => {
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

    it('should return folder basename when package.json and git repos name are not defined', () => {
      const packageJson = undefined
      getReposName.sync.mockReturnValue(undefined)

      const result = getProjectName(packageJson)

      expect(result).toEqual(projectName)
      expect(getReposName.sync).toHaveBeenCalled()
      expect(path.basename).toHaveBeenCalled()
    })
  })
})
