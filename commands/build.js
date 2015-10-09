var path = require('path');
var fs = require('fs');

var chalk = require('chalk');

var platform = require('../lib/platform');

function getBuildInfo(buildPath){
  var build = require(buildPath);
  //determine if given platform is supported
  if(platform.supported.indexOf(build.platform) === -1){
    console.error('Platform ' + build.platform + ' is not supported (yet?)');
  }
}

module.exports = function(buildPath){
  buildPath = path.join(process.cwd(), buildPath)
  fs.stat(buildPath, function(err){
    if(err){
      console.error(chalk.red('There isn\'t a build file at that path!'));
      process.exit(1)
    } else {
      getBuildInfo(buildPath);
    }
  })
};