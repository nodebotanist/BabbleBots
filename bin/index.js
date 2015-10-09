#! /usr/bin/env node

var chalk = require('chalk');

var builder = require('../commands/build');

var build_path = process.argv[2];

if(!build_path){
  console.error(chalk.red('I need a build file path (for now!)'));
  process.exit(1);
} else {
  builder(build_path);
}
