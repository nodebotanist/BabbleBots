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
  loadComponentDefinitions: function(build){
    var result = {};

    build.project.components.forEach(function(component){
      //check if component is supported
      if(!this.components[component.type]){
          console.error('Component file not found for type ' + component.type + '!');
          process.exit(1);
      }
      //require in component definition
      var componentDefinition = require(path.join('../platforms', this.name, this.components[component.type]));
      component.definition = componentDefinition;
    }, this);
  },
  checkPins: function(build){
    build.project.pinsUsed = build.project.pinsUsed || [];
    //check component pins
    build.project.components.forEach(function(component){
      for(pin in component.definition.pins){
          var buildPin = component.pins[pin];
          if(component.definition.pins.hasOwnProperty(pin)){
              // Does the needed pin exist in the build definition?
              if(!buildPin){
                  throw new Error('Pin ' + pin + ' not defined for ' + component.name + '!');
              }
              // Does the pin set in the build definition have the correct capability?
              if(this.pins[buildPin].indexOf(component.definition.pins[pin]) === -1){
                  throw new Error('Pin ' + buildPin + ' does not support pin type ' + component.definition.pins[pin] + '!');
              }
              // Is the pin already in use?
              if(build.project.pinsUsed.indexOf(buildPin) !== -1){
                  throw new Error('Pin ' + buildPin + 'called for in ' + component.name + ' already in use!');
              }

              //We're good to go on this pin!
              build.project.pinsUsed.push(buildPin);
          }
      }
    }, this);
    // all pins are clear and checked. We can add the component to the build.
    return;
  },
  includeFiles: function(build){
    build.project.components.forEach(function(component){
      component.definition.includeFiles.forEach(function(incl){
        build.map.includeFiles.push(incl);
      });
    });
  }
};