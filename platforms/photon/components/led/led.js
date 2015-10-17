var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var Platform = require('../../../../lib/Platform.js');


var Neopixels = {
  name: 'led',
  pins: {
    'led': Platform.pinType.OUTPUT
  },
  includeFiles: [],
  includes:[],
  compFunctions: {},
  preInit: function(build, component){
    component.leds.forEach(function(led){
      build.map.preInit.push('#define ' + led.name.toUpperCase() + '_PIN ' + led.pin);
    });
  },
  init: function(build){
    build.map.init.push('Particle.function("setLED", setLED);')
  },
  loop: function(build){
    // noop
  },
  customFunctions: function(build, component){
    var result = fs.readFileSync(path.resolve(__dirname, 'templates', 'setLED.tmpl'));
    var tmpl = ejs.compile(result.toString());
    build.map.customFunctions.push(tmpl(component));
  },
}

module.exports = Neopixels;