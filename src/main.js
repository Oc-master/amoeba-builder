#!/usr/bin/env node
const { program } = require('commander');
const info = require('../package.json');
const { Create } = require('./commands/create');

program
  .version(info.version, '-v, --version', 'display version for amoeba-builder')
  .usage('<command> [options]');

program
  .command('create [projectName]')
  .description('create a basic project')
  .action((source) => {
    const create = new Create(source);
    create.init();
  });

try {
  program.parse(process.argv);
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
