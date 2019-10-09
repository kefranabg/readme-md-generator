const fs = require('fs')
const inquirer = require('inquirer')
const askSourceFile = require('./questions/source-file')

const getSourceFile = async supportedFiles => {
  const existingSourceFiles = supportedFiles.filter(file => fs.existsSync(file))

  if (existingSourceFiles.length > 1) {
    const response = await inquirer.prompt([askSourceFile(existingSourceFiles)])
    return response.sourceFile
  }

  if (existingSourceFiles.length === 1) {
    return existingSourceFiles[0]
  }

  return undefined
}

module.exports = {
  getSourceFile
}
