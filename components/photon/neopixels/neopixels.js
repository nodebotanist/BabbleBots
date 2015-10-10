var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var Platform = require('../../../lib/platform');

var Neopixels = {
  name: 'neopixels',
  pins: {
    'data': Platform.pinType.OUTPUT
  },
  includeFiles: [
    'includes/neopixel.h',
    'includes/neopixel.cpp'
  ],
  compFunctions: {
    pixels: 'templates/pixels.tmpl'
  },
  includes: function(map){
    map.includes += '#include "neopixel.h"';
  },
  preInit: function(map, component){
    map.preInit += '#define PIXEL_PIN ' + component.pins[0] +
      '\n#define PIXEL_COUNT ' + component.options.length +
      '\n#define PIXEL_TYPE ' + component.options.type + '\n\n' +
      'Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);';
  },
  init: function(map, component){
    map.init += '\tstrip.begin();\n\tstrip.show();';
  },
  loop: function(component){
    //noop (for now!)
  },
  customFunctions: function(map, component){
    if(component.options.sparkFunctions && 
        component.options.sparkFunctions.length > 0){
      component.options.sparkFunctions.forEach(function(func){
        if(!Neopixels.compFunctions[func]){
          console.error('Custom function ' + func + ' not defined for Neopixels!');
          process.exit(1);
        }

        map.init += '\n\tSpark.function("' + func + '", ' + func + ');';

        fs.readFile(path.join(__dirname, Neopixels.compFunctions[func]), function(err, result){
          if(err) { throw err; }

          var tmpl = ejs.compile(result.toString());

          map.customFunctions += tmpl(component);
        });
      });
    }
  },
}

module.exports = Neopixels;