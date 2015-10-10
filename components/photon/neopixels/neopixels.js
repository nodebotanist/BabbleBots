var Platform = require('../../../lib/platform');

module.exports = {
  name: 'neopixels',
  pins: {
    'data': Platform.pinType.OUTPUT
  },
  includeFiles: [
    'includes/neopixel.h',
    'includes/neopixel.cpp'
  ],
  includes: function(){
    return ['#include "neopixel.h"', '#include "neopixel.cpp"'];
  },
  preInit: function(options){
    return 
  },
  init: function(options){
    return 'init string';
  },
  functions: {
    customChangeCommand: function(options){
      return 'return function string here'
    }
  },
  variables: {
    varName: function(options){
      return 'return code to set variable here'
    }
  },
  loop: function(options){
    return 'return loop code here'
  }
}