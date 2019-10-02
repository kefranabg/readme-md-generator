#!/usr/bin/env node

const yargs = require('yargs')
const { noop } = require('lodash')

const mainProcess = require('./cli')

yargs
  .usage('Usage: $0 <command> [options]')
  .command('$0', 'Generate README.md', noop, args => {
    const { path: customTemplatePath, yes: useDefaultAnswers, pomxml: usePomXml } = args
    mainProcess({ customTemplatePath, useDefaultAnswers, usePomXml })
  })
  .string('p')
  .alias('p', 'path')
  .describe('path', 'Path to your own template')
  .boolean('yes')
  .alias('y', 'yes')
  .describe('yes', 'Use default values for all fields')
  .boolean('x')
  .alias('x', 'pomxml')
  .describe('pomxml', 'Load a pom.xml (by default, it\' a package.json')
  .help()
  .alias('v', 'version')
  .epilog(
    'for more information, find our manual at https://github.com/kefranabg/readme-md-generator'
  )
  .parse()
