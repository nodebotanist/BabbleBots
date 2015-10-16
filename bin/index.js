#! /usr/bin/env node

var chalk = require('chalk');

var Build = require('../lib/build');

var build_path = process.argv[2];

if(!build_path){
  console.error(chalk.red('I need a build file path (for now!)'));
  process.exit(1);
} else {
  var myBuild = new Build(build_path);
  myBuild.start();
}

