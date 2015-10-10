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
        addComponent(component, map);
    })
    fs.readFile(path.join(__dirname, 'templates/application.tmpl'), function(err, tmpl){
        console.log(err, tmpl.toString());
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
    neopixels: '../../components/photon/neopixels/neopixels'
  }
}

function addComponent(component, map){
    if(!Photon.components[component.type]){
        console.error('Component file not found for type ' + component.type + '!');
        process.exit(1);
    }

    // TODO: Get pin validation working.
    var comp = require(Photon.components[component.type]);

    // for(pin in component.pins){
    //     var pinUsed = Photon.pins[component.pins[pin]];
    //     if(!pinUsed){
    //         console.error('Pin ' + pin + ' not found!');
    //         process.exit(1);
    //     }

    //     if(Platform.pins[pinUsed].indexOf()

    // }
    map.includes += comp.includes();
}

module.exports = Photon;