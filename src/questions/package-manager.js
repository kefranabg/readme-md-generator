const question = {
  type: 'list',
  message: '📦  Choose Package Manager ',
  name: 'packageManager',
  choices: [
    {
      name: 'npm',
      value: 'npm'
    },
    {
      name: 'yarn',
      value: 'yarn'
    }
  ]
}

/**
 * return null if we can already infer the package manager
 * from the lock file
 */
module.exports = projectInfos => (projectInfos.packageManager ? null : question)
