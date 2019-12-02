<h1 align="center">Welcome to readme-md-generator 👋</h1>
<p align="center">
  <img src="https://img.shields.io/npm/v/readme-md-generator.svg?orange=blue" />
  <a href="https://www.npmjs.com/package/readme-md-generator">
    <img alt="downloads" src="https://img.shields.io/npm/dm/readme-md-generator.svg?color=blue" target="_blank" />
  </a>
  <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://codecov.io/gh/kefranabg/readme-md-generator">
    <img src="https://codecov.io/gh/kefranabg/readme-md-generator/branch/master/graph/badge.svg" />
  </a>
  <a href="https://github.com/frinyvonnick/gitmoji-changelog">
    <img src="https://img.shields.io/badge/changelog-gitmoji-brightgreen.svg" alt="gitmoji-changelog">
  </a>
  <a href="https://twitter.com/FranckAbgrall">
    <img alt="Twitter: FranckAbgrall" src="https://img.shields.io/twitter/follow/FranckAbgrall.svg?style=social" target="_blank" />
  </a>
</p>

> CLI that generates beautiful README.md files.<br /> `readme-md-generator` will suggest you default answers by reading your `package.json` and `git` configuration.

## ✨ Demo

`readme-md-generator` is able to read your environment (package.json, git config...) to suggest you default answers during the `README.md` creation process:

<p align="center">
  <img width="700" align="center" src="https://user-images.githubusercontent.com/9840435/60266022-72a82400-98e7-11e9-9958-f9004c2f97e1.gif" alt="demo"/>
</p>

Generated `README.md`:

<p align="center">
  <img width="700" src="https://user-images.githubusercontent.com/9840435/60266090-9cf9e180-98e7-11e9-9cac-3afeec349bbc.jpg" alt="cli output"/>
</p>

Example of `package.json` with good meta data:

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

## 🚀 Usage

Make sure you have [npx](https://www.npmjs.com/package/npx) installed (`npx` is shipped by default since npm `5.2.0`)

Just run the following command at the root of your project and answer questions:

```sh
npx readme-md-generator
```

Or use default values for all questions (`-y`):

```sh
npx readme-md-generator -y
```

Use your own `ejs` README template (`-p`):

```sh
npx readme-md-generator -p path/to/my/own/template.md
```

You can find [ejs README template examples here](https://github.com/kefranabg/readme-md-generator/tree/master/templates).

## Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/kefranabg/readme-md-generator/graphs/contributors"><img src="https://opencollective.com/readme-md-generator/contributors.svg?width=890&button=false" /></a>

## Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/readme-md-generator/contribute)]

### Individuals

<a href="https://opencollective.com/readme-md-generator"><img src="https://opencollective.com/readme-md-generator/individuals.svg?width=890"></a>

### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/readme-md-generator/contribute)]
<a href="https://opencollective.com/readme-md-generator/organization/0/website"><img src="https://opencollective.com/readme-md-generator/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/readme-md-generator/organization/1/website"><img src="https://opencollective.com/readme-md-generator/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/readme-md-generator/organization/2/website"><img src="https://opencollective.com/readme-md-generator/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/readme-md-generator/organization/3/website"><img src="https://opencollective.com/readme-md-generator/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/readme-md-generator/organization/4/website"><img src="https://opencollective.com/readme-md-generator/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/readme-md-generator/organization/5/website"><img src="https://opencollective.com/readme-md-generator/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/readme-md-generator/organization/6/website"><img src="https://opencollective.com/readme-md-generator/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/readme-md-generator/organization/7/website"><img src="https://opencollective.com/readme-md-generator/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/readme-md-generator/organization/8/website"><img src="https://opencollective.com/readme-md-generator/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/readme-md-generator/organization/9/website"><img src="https://opencollective.com/readme-md-generator/organization/9/avatar.svg"></a>

## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check [issues page](https://github.com/kefranabg/readme-md-generator/issues) if you want to contribute.<br />
[Check the contributing guide](./CONTRIBUTING.md).<br />

## Author

👤 **Franck Abgrall**

- Twitter: [@FranckAbgrall](https://twitter.com/FranckAbgrall)
- Github: [@kefranabg](https://github.com/kefranabg)

## Show your support

Please ⭐️ this repository if this project helped you!

<a href="https://www.patreon.com/FranckAbgrall">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## 📝 License

Copyright © 2019 [Franck Abgrall](https://github.com/kefranabg).<br />
This project is [MIT](https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
