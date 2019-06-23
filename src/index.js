#!/usr/bin/env node

const yargs = require('yargs')

const { mainProcess } = require('./cli')
const { getReadmeTemplatePath } = require('./readme')

yargs
  .usage('Usage: $0 <command> [options]')
  .command(
    '$0 [template]',
    'Generate README.md from a template',
    command =>
      command.positional('template', {
        desc: 'The name of template you want to use',
        default: 'default'
      }),
    args => {
      const templatePath = getReadmeTemplatePath(args)
      mainProcess({ templatePath, yes: args.yes })
    }
  )
  .string('p')
  .alias('p', 'path')
  .describe('path', 'Path to your own template')
  .boolean('yes')
  .alias('y', 'yes')
  .describe('yes', 'Use default values for all fields')
  .help()
  .alias('v', 'version')
  .epilog(
    'for more information, find our manual at https://github.com/kefranabg/readme-md-generator'
  )
  .parse()
