<h1 align="center">Welcome to readme-md-generator 👋</h1>
<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.4-blue.svg?cacheSeconds=2592000" />
  <!-- <img src="https://img.shields.io/jsdelivr/npm/hm/readme-md-generator.svg"> -->
  <a href="https://codecov.io/gh/kefranabg/readme-md-generator">
    <img src="https://codecov.io/gh/kefranabg/readme-md-generator/branch/master/graph/badge.svg" />
  </a>
  <a href="https://greenkeeper.io/">
    <img alt="Greenkeeper" src="https://badges.greenkeeper.io/kefranabg/readme-md-generator.svg" target="_blank" />
  </a>
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

> CLI that generates beautiful README.md files.<br /> `readme-md-generator` will suggest you default answers by reading your `package.json` and `git` configuration.

## ✨ Demo

`readme-md-generator` is able to read your environment (package.json, git config...) to suggest you default answers during the `README.md` creation process :

<img width="700" src="https://user-images.githubusercontent.com/9840435/59162633-8f291b80-8af4-11e9-9985-b0f768cbc2b1.gif" alt="demo"/>

Generated `README.md` :

<img width="700" src="https://user-images.githubusercontent.com/9840435/59162884-02cd2780-8af9-11e9-9765-e1af31fd8bc2.jpg" alt="cli output"/>

Example of `package.json` with good meta data :

```json
// The package.json is not required to run README-MD-GENERATOR
{
  "name": "readme-md-generator",
  "version": "0.1.3",
  "description": "CLI that generates beautiful README.md files.",
  "author": "Franck Abgrall",
  "license": "MIT",
  "homepage": "https://github.com/kefranabg/readme-md-generator#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/kefranabg/readme-md-generator.git"
  },
  "bugs": {
    "url": "https://github.com/kefranabg/readme-md-generator/issues"
  },
  "engines": {
    "npm": ">=5.5.0",
    "node": ">=9.3.0"
  }
}
```

## 📦 Install

With npm :

```sh
npm i -g readme-md-generator
```

With yarn :

```sh
yarn global add readme-md-generator
```

## 🚀 Usage

Just run the following command at the root of your project and answer questions :

```sh
readme
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to check [issues page](https://github.com/kefranabg/readme-md-generator/issues) if you want to contribute.

## 👤 Author

**Franck Abgrall**

- Twitter: [@FranckAbgrall](https://twitter.com/FranckAbgrall)
- Github: [@kefranabg](https://github.com/kefranabg)

## 🙏 Show your support

Please ⭐️ this repository if you like it.

## 📝 License

Copyright © 2019 [Franck Abgrall](https://github.com/kefranabg).

This project is [MIT](https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
