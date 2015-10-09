var Platform = require('../../../lib/platform');

module.exports = {
  name: 'neopixels',
  pins: {
    'data': Platform.pinType.OUTPUT
  },
  includes: function(options){
    return 'include libraries here';
  },
  preInit: function(options){
    return 'return preInit code here';
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