var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var Platform = require('../../../../lib/Platform.js');


var Neopixels = {
  name: 'neopixels',
  pins: {
    'data': Platform.pinType.OUTPUT
  },
  includeFiles: {
    'neopixel.h': 'https://raw.githubusercontent.com/technobly/SparkCore-NeoPixel/master/firmware/neopixel.h',
    'neopixel.cpp': 'https://raw.githubusercontent.com/technobly/SparkCore-NeoPixel/master/firmware/neopixel.cpp': 
  },
  includes:[
    '#include neopixel.h'
  ],
  compFunctions: {
    pixels: 'templates/pixels.tmpl'
  }
  preInit: function(build, component){
    build.map.preInit.push('#define PIXEL_PIN ' + component.pins.data +
      '\n#define PIXEL_COUNT ' + component.options.length +
      '\n#define PIXEL_TYPE ' + component.options.type + '\n\n' +
      'Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);');
  },
  init: function(build){
    build.map.init.push('\tstrip.begin();\n\tstrip.show();');
  },
  loop: function(build){
    //noop (for now!)
  },
  customFunctions: function(build, component){
    if(component.options.customFunctions && 
        component.options.customFunctions.length > 0){
      component.options.customFunctions.forEach(function(func){
        if(!Neopixels.compFunctions[func]){
          console.error('Custom function ' + func + ' not defined for Neopixels!');
          process.exit(1);
        }

        build.map.init.push('\n\tParticle.function("' + func + '", ' + func + ');');

        var result = fs.readFileSync(path.join(__dirname, Neopixels.compFunctions[func]));
        var tmpl = ejs.compile(result.toString());
        build.map.customFunctions.push(tmpl(component));
      });
    }
  },
}

module.exports = Neopixels;