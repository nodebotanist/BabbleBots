
function Component(){

}

Component.prototype.create = function(options){
  this.type = options.type;
  this.constants = options.constants;
  this.pins = options.type === 'I2C' ? ['SDA', 'SCL'] : options.pins;
  this.includePaths = options.includePaths;
  this.constructor = options.constructor;
}

Component.prototype.write_init = function(){
  //write a pin setup step
  //
}

module.exports = Component;