var fs = require('fs');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var ejs = require('ejs');

var Platform = require('../../lib/platform.js');

var Photon = {
  build: function(options){
    var map = {
        includes: '',
        preInit: '',
        init: '',
        loop: '',
        customFunctions: ''
    }
    //check each component exists
    //check each pin used exists
    //check each pin is used correctly
    //add component to map
    options.components.forEach(function(component){
        addComponent(component, map, options);
    })
    fs.readFile(path.join(__dirname, 'templates/application.tmpl'), function(err, tmpl){
        var appStream = fs.createWriteStream(path.join(process.cwd(), options.dest, 'app.ino'));
        var template = ejs.compile(tmpl.toString());

        appStream.write(template(map));
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
  },
  components: {
    neopixels: './components/neopixels/neopixels'
  },
  addComponents: function(build, platform, buildMap){
    var pinsUsed = [];
    build.components.forEach(function(component){
        //check if component is supported
        if(!Photon.components[component.type]){
            console.error('Component file not found for type ' + component.type + '!');
            process.exit(1);
        }
        //require in component definition
        var componentDefinition = require(Photon.components[component.type]);
        //check component pins
        for(pin in componentDefinition.pins){
            var buildPin = component.pins[pin];
            if(componentDefinition.pins.hasOwnProperty(pin)){
                // Does the needed pin exist in the build definition?
                if(!buildPin){
                    throw new Error('Pin ' + pin + ' not defined for ' + component.name + '!');
                }
                // Does the pin set in the build definition have the correct capability?
                if(Photon.pins[buildPin].indexOf(componentDefinition.pins[pin]) === -1){
                    throw new Error('Pin ' + buildPin + ' does not support pin type ' + componentDefinition.pins[pin] + '!');
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

    });
    //return registry of components
  }
}

function addComponent(component, map, options){

    comp.includes(map, component);
    comp.preInit(map, component);
    comp.init(map, component);
    comp.loop(map, component);
    comp.customFunctions(map, component);
}

module.exports = Photon;