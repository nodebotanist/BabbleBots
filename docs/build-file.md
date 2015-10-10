# Build File

This file represents your actual robotics build that BabbleBots will generate a thin client for. 

The file needs to be a CommonJS module, like so:

``` javascript
module.exports = {
    //build options go here...
};
```

## Build file properties

**name:** This is just a string representing the name of your project (as of 0.1.0 this doesn't actually do anything.)

**platform:** This is a string representing the platform you want to generate a thin client for. Currenty supported:

* 'photon' -- the Particle Photon

**dest:** This is a directory, where the files output will be stored. *This needs to be a directory because generally you'll need to export multiple files, depending on the dependencies of the components used.*

**components:** This is an array of objects representing components. Components contain the following attributes:
    
* **name:** a user-selected name for the component, useful for differentiating between multiple instances of the same type of component.
* **type:** The type of component you are setting up. What's supported depends on the platform-- check your platform's docs for more info.
* **pins:** an array pf pins used by this component. These pins are platform-dependent. Not always required (e.g. I2C devices)
* **options:** an object representing options for the particular component type. E.g.: neopixels component on Photon requires a length and type in its options object.