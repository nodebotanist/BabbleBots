// generate file for thin client
var client = '';

// include headers
// #include {{path}}
// for all include paths
var includes = ['application.h', 'neopixel/neopixel.h'];

includes.forEach(function(value){
  client += '#include ' + value  + '\n';
})
client += '\n';

// platform pre-init
client += 'SYSTEM_MODE(AUTOMATIC);\n';

client += '\n';

// components pre-init
// define constants

var constants = {
  'PIXEL_PIN': 'D3',
  'PIXEL_COUNT': '7',
  'PIXEL_TYPE': 'WS2812'
};
// #define {{name}} {{value}}
for(key in constants){
  if(constants.hasOwnProperty(key)){
    var value = constants[key]
    client += '#define ' + key + ' ' + value +'\n';
  };
};

client += '\n';

// call component constructors
client += 'Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);\n';

client += '\n';

// setup
// create setup function
client += 'void setup(){';

// begin components
client += 'strip.begin();';

client += '}';
// loop
// create loop function
// update components

// functions

console.log(client);