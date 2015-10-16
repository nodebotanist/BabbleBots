var fs = require('fs');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var ejs = require('ejs');

var Platform = require('../../lib/platform.js');

var Photon = {
    name: 'photon',
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
    neopixels: 'components/neopixels/neopixels'
  },
  addComponents: function(build){
    this.loadComponentDefinitions(build); //found on Platform
    build.project.components.forEach(function(component){
      component.definition.includeFiles.forEach(function(incl){
        build.map.includeFiles.push(path.resolve(__dirname, 'components', component.name, incl));
      });
      component.definition.includes.forEach(function(incl){
        build.map.includes.push(incl);
      });
      component.definition.preInit(build, component);
      component.definition.init(build, component);
      component.definition.loop(build, component);
      component.definition.customFunctions(build, component);
    });
  },
  compileTemplate: function(build){ 
    console.log(build.map);
    var tmpl = fs.readFileSync(path.resolve(__dirname, 'templates/application.tmpl'));
    var template = ejs.compile(tmpl.toString());

    return template(build.map);
  }
}

_.extend(Photon, Platform);

module.exports = Photon;