var path = require('path');

// needs: writePinSetup
module.exports = {
  supported: {
    photon: '../platforms/photon/photon'
  },
  pinType: {
    INPUT: 0,
    OUTPUT: 1,
    ANALOG: 2,
    PWM: 3,
    SERVO: 4,
    I2C: 6
  },
  loadComponentDefinitions: function(build, platform){
    var result = {};

    build.components.forEach(function(component){
      //check if component is supported
      if(!platform.components[component.type]){
          console.error('Component file not found for type ' + component.type + '!');
          process.exit(1);
      }
      //require in component definition
      var componentDefinition = require(path.join('../platforms', platform.name, platform.components[component.type]));
      component.definition = componentDefinition;
    });
  },
  checkPins: function(build, platform, componentDefinitions){
    var pinsUsed = [];
    build.components.forEach(function(component){
        //check component pins
        for(pin in component.definition.pins){
            var buildPin = component.pins[pin];
            if(component.definition.pins.hasOwnProperty(pin)){
                // Does the needed pin exist in the build definition?
                if(!buildPin){
                    throw new Error('Pin ' + pin + ' not defined for ' + component.name + '!');
                }
                // Does the pin set in the build definition have the correct capability?
                if(platform.pins[buildPin].indexOf(component.definition.pins[pin]) === -1){
                    throw new Error('Pin ' + buildPin + ' does not support pin type ' + component.definition.pins[pin] + '!');
                }
                // Is the pin already in use?
                if(pinsUsed.indexOf(buildPin) !== -1){
                    throw new Error('Pin ' + buildPin + 'called for in ' + component.name + ' already in use!');
                }

                //We're good to go on this pin!
                pinsUsed.push(buildPin);
            }
        }
        // all pins are clear and checked. We can add the component to the build.
        return;
    });
  }
};