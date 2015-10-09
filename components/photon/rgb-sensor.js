var Platform = require('../../lib/platform');

module.exports = {
  name: 'neopixels',
  pins: {
    'data': Platform.pinType.I2C
  },
  includes: function(){
    return 'include libraries here';
  },
  preInit: function(){
    return 'return preInit code here';
  },
  init: function(){
    return 'init string';
  },
  functions: {
    customChangeCommand: function(){
      return 'return function string here'
    }
  },
  variables: {
    varName: function(){
      return 'return code to set variable here'
    }
  },
  loop: function(){
    return 'return loop code here'
  }
}