const loadJsonFile = require('load-json-file')
const boxen = require('boxen')
const {
  getPackageJson,
  showEndMessage,
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
})
