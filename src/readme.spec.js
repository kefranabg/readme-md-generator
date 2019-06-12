const fs = require('fs')
const ora = require('ora')

jest.mock('ora')

const { writeReadme, buildReadmeContent, README_PATH } = require('./readme')

describe('readme', () => {
  const succeed = jest.fn()
  const fail = jest.fn()

  ora.mockReturnValue({
    start: () => ({
      succeed,
      fail
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('writeReadme', () => {
    it('should call ora with correct parameters in success case', async () => {
      const readmeContent = 'content'
      fs.writeFile = jest.fn((path, content, cb) => cb(null, 'done'))

      await writeReadme(readmeContent)

      expect(ora).toHaveBeenCalledTimes(1)
      expect(ora).toHaveBeenCalledWith('Creating README')
      expect(succeed).toHaveBeenCalledTimes(1)
      expect(succeed).toHaveBeenCalledWith('README created')
    })

    it('should call ora with correct parameters in fail case', async () => {
      const readmeContent = 'content'
      fs.writeFile = jest.fn(() => {
        throw new Error('error')
      })

      try {
        await writeReadme(readmeContent)
        // eslint-disable-next-line no-empty
      } catch (err) {}

      expect(ora).toHaveBeenCalledTimes(1)
      expect(ora).toHaveBeenCalledWith('Creating README')
      expect(fail).toHaveBeenCalledTimes(1)
      expect(fail).toHaveBeenCalledWith('README creation fail')
    })

    it('should call writeFile with correct parameters', async () => {
      const readmeContent = 'content'
      fs.writeFile = jest.fn((path, content, cb) => cb(null, 'done'))

      await writeReadme(readmeContent)

      expect(fs.writeFile).toHaveBeenCalledTimes(1)
      expect(fs.writeFile.mock.calls[0][0]).toBe(README_PATH)
      expect(fs.writeFile.mock.calls[0][1]).toBe(readmeContent)
    })
  })

  describe('buildReadmeContent', () => {
    const templateName = 'default'
    const context = {
      isGithubRepos: true,
      repositoryUrl: 'https://github.com/kefranabg/readme-md-generator',
      projectPrerequisites: ['npm >=5.5.0', 'node >=9.3.0'],
      projectName: 'readme-md-generator',
      projectVersion: '0.1.3',
      projectDescription:
        'Generates beautiful README files from git config & package.json infos',
      projectDocumentationUrl:
        'https://github.com/kefranabg/readme-md-generator#readme',
      projectHomepage:
        'https://github.com/kefranabg/readme-md-generator#readme',
      authorName: 'Franck Abgrall',
      authorGithubUsername: 'kefranabg',
      authorTwitterUsername: '',
      licenseName: 'MIT',
      licenseUrl:
        'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE',
      contributingUrl: 'https://github.com/kefranabg/readme-md-generator/issues'
    }

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should call ora with correct parameters in success case', async () => {
      await buildReadmeContent(context, templateName)

      expect(ora).toHaveBeenCalledTimes(1)
      expect(ora).toHaveBeenCalledWith('Loading README template')
      expect(succeed).toHaveBeenCalledTimes(1)
      expect(succeed).toHaveBeenCalledWith('README template loaded')
    })

    it('should return readme template content', async () => {
      const result = await buildReadmeContent(context, templateName)

      expect(result)
        .toEqual(`<h1 align="center">Welcome to readme-md-generator 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.1.3-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/kefranabg/readme-md-generator#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/kefranabg/readme-md-generator/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> Generates beautiful README files from git config &amp; package.json infos

## 🏠 Homepage

[https://github.com/kefranabg/readme-md-generator#readme](https://github.com/kefranabg/readme-md-generator#readme)

## ⚠️ Prerequisites

- npm &gt;=5.5.0
- node &gt;=9.3.0

## 📦 Install

\`\`\`sh
npm i
\`\`\`

## 🚀 Usage

\`\`\`sh
npm run start
\`\`\`

## ✅ Run tests

\`\`\`sh
npm run test
\`\`\`

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to check [issues page](https://github.com/kefranabg/readme-md-generator/issues) if you want to contribute.

## 👤 Author

**Franck Abgrall**

* Github: [@kefranabg](https://github.com/kefranabg)

## 🙏 Show your support

Please ⭐️ this repository if you like it.

## 📝 License

Copyright © 2019 [Franck Abgrall](https://github.com/kefranabg).

This project is [MIT](https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_`)
    })

    it('should call ora with correct parameters in fail case', async () => {
      fs.readFile = jest.fn(() => {
        throw new Error('error')
      })

      try {
        await buildReadmeContent(context, templateName)
        // eslint-disable-next-line no-empty
      } catch (err) {}

      expect(ora).toHaveBeenCalledTimes(1)
      expect(ora).toHaveBeenCalledWith('Loading README template')
      expect(fail).toHaveBeenCalledTimes(1)
      expect(fail).toHaveBeenCalledWith('README template loading fail')
    })
  })
})
