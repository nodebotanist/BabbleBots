var util = require('util');
var Platform = require('../lib/platform.js');
var _ = require('lodash');

module.exports = {
  build: function(options){
    //check each component exists
    //check each pin used exists
    //check each pin is used correctly
    //add component to map
    async.each(options.components, addComponent, function(err){

    });
  },
  pins: {
    D0: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.PWM, Platform.pinType.SERVO],
    D1: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.PWM, Platform.pinType.SERVO],
    D2: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.PWM, Platform.pinType.SERVO],
    D3: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.PWM, Platform.pinType.SERVO],
    D4: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, ],
    D5: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, ],
    D6: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, ],
    D7: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, ],
    A0: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.ANALOG, Platform.pinType.PWM, Platform.pinType.SERVO],
    A1: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.ANALOG, Platform.pinType.PWM, Platform.pinType.SERVO],
    A2: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.ANALOG, ],
    A3: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.ANALOG, ],
    A4: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.ANALOG, Platform.pinType.PWM, Platform.pinType.SERVO],
    A5: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.ANALOG, Platform.pinType.PWM, Platform.pinType.SERVO],
    A6: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.ANALOG, Platform.pinType.PWM, Platform.pinType.SERVO],
    A7: [Platform.pinType.INPUT, Platform.pinType.OUTPUT, Platform.pinType.ANALOG, Platform.pinType.PWM, Platform.pinType.SERVO],
  }
}

function addComponent(component){

}