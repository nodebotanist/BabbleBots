var path = require('path');
var fs = require('fs.extra');

var _ = require('lodash');
var chalk = require('chalk');

var Platform = require('../lib/platform');

function Build(buildPath){
  this.buildPath = buildPath;
  this.map = {
    includeFiles: [],
    includes: [],
    preInit: [],
    init: [],
    loop: [],
    customFunctions: []
  };
}

canBuild = {
  start: function(){
    this.buildPath = path.join(process.cwd(), this.buildPath)
    fs.stat(this.buildPath, function(err){
      if(err){
        console.error(chalk.red('There isn\'t a build file at that path!'));
        process.exit(1)
      } else {
        this.getBuildInfo();
      }
    }.bind(this))
  },
  getBuildInfo: function getBuildInfo(){
    this.project = require(this.buildPath);
    //determine if given platform is supported
    if(!Platform.supported[this.project.platform]){
      console.error('Platform ' + this.project.platform + ' is not supported (yet?)');
    } else {
      this.platform = require(Platform.supported[this.project.platform]);
      this.buildProgram();
    }
  },
  buildProgram: function buildProgram(){
    this.platform.addComponents(this);
    this.writeProgram();
  },
  writeProgram: function(){
    var text = this.platform.compileTemplate(this);
    fs.writeFile(path.join(process.cwd(), this.project.dest, this.project.name + '.ino'), text, function(err){
      if(err){ throw err; }
      console.log(chalk.green('Main application ' + this.project.name + '.ino written!'));
      this.map.includeFiles.forEach(function(file){
        fs.copyRecursive(file, path.resolve(process.cwd(), this.project.dest), function(err){
          if(err){
            if(err.toString().indexOf('exists') !== -1){
              console.log(chalk.yellow('WARNING: ' + err.toString()));
            } else {
              throw err;
            }
          }            
        });
      }.bind(this));
    }.bind(this));
  }
}

_.extend(Build.prototype, canBuild);

module.exports = Build;