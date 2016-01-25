var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var _ = require('lodash');

var Platform = require('../../../../lib/Platform.js');
var Component = require('../../../../lib/component.js');

var Tcs34725 = {
  name: 'tcs34725',
  pins: {},
  includeFiles: {
    'Adafruit_TCS34725.h': 'https://raw.githubusercontent.com/krvarma/Adafruit_TCS34725_SparkCore/master/firmware/Adafruit_TCS34725.h',
    'Adafruit_TCS34725.cpp': 'https://raw.githubusercontent.com/krvarma/Adafruit_TCS34725_SparkCore/master/firmware/Adafruit_TCS34725.cpp'
  },
  includes:[
    '#include Adafruit_TCS34725.h'
  ],
  compFunctions: {},
  preInit: function(build, component){
    build.map.preInit.push('Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);\nint redValue = 0;\nint blueValue = 0;\nint greenValue = 0;\nuint16_t clear, red, green, blue;');
  },
  init: function(build){
    var result = fs.readFileSync(path.resolve(__dirname, 'templates/init.tmpl'));
    var tmpl = ejs.compile(result.toString());
    build.map.init.push(tmpl());
  },
  loop: function(build){
    var result = fs.readFileSync(path.resolve(__dirname, 'templates/loop.tmpl'));
    var tmpl = ejs.compile(result.toString());
    build.map.loop.push(tmpl());
  },
  customFunctions: function(build, component){}
}

_.extend(Tcs34725, Component);

module.exports = Tcs34725;