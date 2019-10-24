# Contributing to Readme Markdown Generator

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.
Please note we have a [code of conduct](https://github.com/kefranabg/readme-md-generator/blob/master/.github/CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Table of Contents

- [Setting Up the project locally](#setting-up-the-project-locally)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Add yourself as a contributor](#add-yourself-as-a-contributor)

## Setting Up the project locally

To install the project you need to have `node` and `npm`

1.  [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone
    your fork:

    ```sh
    # Clone your fork
    git clone https://github.com/<your-username>/readme-md-generator.git

    # Navigate to the newly cloned directory
    cd readme-md-generator
    ```

2.  Your environment needs to be running `node` version >= 9.3.0 and `npm` version >= 5.5.0.

3.  from the root of the project: `npm` to install all dependencies

    - make sure you have latest `npm` version

4.  from the root of the project: `npm start` to run the cli.

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```sh
> git remote add upstream https://github.com/kefranabg/readme-md-generator.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream," then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Submitting a Pull Request

Please go through existing issues and pull requests to check if somebody else is already working on it.

Also, make sure to run the tests and lint the code before you commit your
changes.

```sh
npm run test
npm run lint
```

## Add yourself as a contributor

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

To add yourself to the table of contributors on the `README.md`, please use the
automated script as part of your PR:

```sh
npm run contributors:add
```

Follow the prompt and commit `.all-contributorsrc` and `README.md` in the PR.

Note: We also have [@all-contributors bot 🤖](https://github.com/all-contributors/all-contributors-bot) to add you as a contributor in case you forget to run the aforementioned script.
