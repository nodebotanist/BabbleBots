var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var _ = require('lodash');

var Platform = require('../../../../lib/Platform.js');
var Component = require('../../../../lib/component');

var InternetButton = {
  name: 'internetbutton',
  pins: {
    'data': Platform.pinType.OUTPUT
  },
  includeFiles: {
    'InternetButton.h': 'https://raw.githubusercontent.com/spark/InternetButton/master/firmware/InternetButton.h', 
    'InternetButton.cpp': 'https://raw.githubusercontent.com/spark/InternetButton/master/firmware/InternetButton.cpp'
  },
  includes:[
    '#include InternetButton.h'
  ],
  compFunctions: {
    'pixels': 'templates/pixels.tmpl'
  },
  preInit: function(build, component){
    build.map.preInit.push('InternetButton b = InternetButton();\n\nint xValue = 0;\nint yValue = 0;\nint zValue = 0;');
  },
  init: function(build, component){
    var result = fs.readFileSync(path.resolve(__dirname, 'templates/init.tmpl'));
    var tmpl = ejs.compile(result.toString());
    build.map.init.push(tmpl({ legacy: component.options.legacy }));
  },
  loop: function(build, component){
    var result = fs.readFileSync(path.resolve(__dirname, 'templates/loop.tmpl'));
    var tmpl = ejs.compile(result.toString());
    build.map.loop.push(tmpl({ delay: component.options.buttonDelay || 400 }));
  },
  customFunctions: function(build, component){
    if(component.options.customFunctions && 
        component.options.customFunctions.length > 0){
      component.options.customFunctions.forEach(function(func){
        if(!InternetButton.compFunctions[func]){
          console.error('Custom function ' + func + ' not defined for Internet Button!');
          process.exit(1);
        }

        build.map.init.push('\n\tParticle.function("' + func + '", ' + func + ');');

        var result = fs.readFileSync(path.join(__dirname, InternetButton.compFunctions[func]));
        var tmpl = ejs.compile(result.toString());
        build.map.customFunctions.push(tmpl(component));
      });
    }
  },
}
_.extend(InternetButton, Component);

module.exports = InternetButton;