#! /usr/bin/env node

var path = require('path');

var build_path = process.argv[2];

var build = require(path.join(__dirname, '../', build_path));

console.log(build);