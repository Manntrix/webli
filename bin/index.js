#!/usr/bin/env node
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const folder = require('../lib/new/default');
const toolsGen = require('../lib/tools/tools')
const ora = require('ora');
const htmlCreate = require('../lib/new/html/html-create')
const reactGen = require('../lib/new/react/react-gen')
const reactCr = require('../lib/new/react/react-create')
const reactWeb = require('../lib/new/react/react-websites')
const reactEx = require('../lib/new/react/react-examples')
const reactmo = require('../lib/new/react/react-modules')
const wpCreate = require('../lib/new/wp/wp-create')
const wpGen = require('../lib/new/wp/wp-gen')
const wpBoiler = require('../lib/new/wp/wp-boilerplate')
const wpDemos = require('../lib/new/wp/wp-demo')
const htmlGen = require('../lib/new/html/html-gen')
const htmlBoiler = require('../lib/new/html/html-boiler')
const htmlDemo = require('../lib/new/html/html-demos')
const wpTools = require('../lib/tools/wp/wp')
const wpCode = require('../lib/tools/wp/codegen')
const wpMigration = require('../lib/tools/wp/wp-migration')
const wpUser = require('../lib/tools/wp/wp-users')
const wpConfig = require('../lib/tools/wp/wp-config-gen')
const wpMaint = require('../lib/tools/wp/wp-maintenance')
const wpMedia = require('../lib/tools/wp/wp-media')
const archv = require('../lib/tools/archiever')

const notifier = updateNotifier({
  pkg
});
if (notifier.update) {
  console.log(`Update available: ${notifier.update.latest}`);
}
const argv = require('yargs')
.command({
    command: 'new',
    aliases: ['n'],
    desc: 'Create a starter website and app.',
    handler: () => {
      folder()
    },
    builder: (argv) => argv
    .command({
      command: 'html',
      aliases: ['h'],
      desc: 'Create html boilerplate',
      handler: () => {
        htmlGen()
    },
    builder: (argv) => argv
    .command({
      command: 'create',
      aliases: ['c'],
      desc: 'Create html project',
      handler: () => {
        htmlCreate()
    },
    })
    .command({
      command: 'boilerplate',
      aliases: ['b'],
      desc: 'Create html boilerplate',
      handler: () => {
        htmlBoiler()
    },
    })
    .command({
      command: 'demos',
      aliases: ['d'],
      desc: 'Create html demo sites',
      handler: () => {
        htmlDemo()
    },
    })
    })
    .command({
      command: 'react',
      aliases: ['r'],
      desc: 'Open react options',
      handler: () => {
        reactGen()
    },
    builder: (argv) => argv
    .command({
      command: 'create',
      aliases: ['c'],
      desc: 'Create react project',
      handler: () => {
        reactCr()
    },
    })
    .command({
      command: 'website',
      aliases: ['w'],
      desc: 'Generate premade react templates',
      handler: () => {
        reactWeb()
    },
    })
    .command({
      command: 'modules',
      aliases: ['m'],
      desc: 'Generate react modules',
      handler: () => {
        reactmo()
    },
    })
    .command({
      command: 'examples',
      aliases: ['e'],
      desc: 'Generate premade react apps',
      handler: () => {
        reactEx()
    },
    })
    })
    .command({
      command: 'wordpress',
      aliases: ['wp'],
      desc: 'Open wordpress options',
      handler: () => {
        wpGen()
    },
    builder: (argv) => argv
    .command({
      command: 'create',
      aliases: ['c'],
      desc: 'Create a starter project for wordpress.',
      handler: () => {
        wpCreate()
    },
    })
    .command({
      command: 'boilerplate',
      aliases: ['b'],
      desc: 'Create a boilerplate for wordpress.',
      handler: () => {
        wpBoiler()
    },
    })
    .command({
      command: 'demos',
      aliases: ['d'],
      desc: 'Create premade wordpress sites.',
      handler: () => {
        wpDemos()
    },
    })
    })
  })
.command({
    command: 'tools',
    aliases: ['t'],
    desc: 'Different sets of tool for different purpose',
    handler: () => {
      toolsGen()
    },
    builder: (argv) => argv
    .command({
      command: 'wordpress',
      aliases: ['wp'],
      desc: 'Set of tools for wordpress',
      handler: () => {
        wpTools()
    },
    builder: (argv) => argv
    .command({
      command: 'codegenerator',
      aliases: ['cg'],
      desc: 'Generate codes for wordpress.',
      handler: () => {
        wpCode()
    },
    })
    .command({
      command: 'migration',
      aliases: ['m'],
      desc: 'Import and Export wordpress site.',
      handler: () => {
        wpMigration()
    },
    })
    .command({
      command: 'user',
      aliases: ['u'],
      desc: 'Changes user details.',
      handler: () => {
        wpUser()
    },
    })
    .command({
      command: 'config',
      aliases: ['wc'],
      desc: 'Change config file.',
      handler: () => {
        wpConfig()
    },
    })
    .command({
      command: 'maintenance',
      aliases: ['mm'],
      desc: 'Activate or Deactivate Maintenance Mode.',
      handler: () => {
        wpMaint()
    },
    })
    .command({
      command: 'media',
      aliases: ['md'],
      desc: 'Media tool for wordpress.',
      handler: () => {
        wpMedia()
    },
    })
    })
    .command({
      command: 'archieve',
      aliases: ['a'],
      desc: 'Different sets of tool for different purpose',
      handler: () => {
        archv()
    },
    })
    
  })
  .demandCommand()
  .help()
  .wrap(72)
  .version()
  .usage('Usage: webli <command> [options]')
  .argv