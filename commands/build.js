var path = require('path');
var fs = require('fs');

var chalk = require('chalk');

var Platform = require('../lib/platform');

function getBuildInfo(buildPath){
  var build = require(buildPath);
  //determine if given platform is supported
  if(!Platform.supported[build.platform]){
    console.error('Platform ' + build.platform + ' is not supported (yet?)');
  } else {
    var platform = require(Platform.supported[build.platform]);
    platform.build(build);
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