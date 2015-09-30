BabbleBots API
==============

Defining a Project
------------------

A project should be a JS object with the following properties:

* **platform:** the platform this project is meant to run on
* **components:** an array of objects representing components, with the following attributes:
    * **name:** the name of the component
    * **pins:** the pins the component will use

Defining a Platform
-------------------

Platforms should extend BabbleBots.platform. They have access to the following functions:

###.create(options)

Creates a platform. Options include:

* **name:** Name of the platform
* **pins:** Contains an object, with the keys set to names and the values set to an array of values representing what that pin can do. Values include 'INPUT', 'OUTPUT', 'PWM', 'ANALOG', 'SCL', 'SDA'

Platforms need to implement the following:

### .setPinFunction()

This function, when called, writes a function allowing the thin client to write values to pins

### .createVariable(component, pin)

This function, when called, writes code for the thin client that allows for the reading of a sensor component set on pin (can be 'I2C')

### .createFunction(component, pin)

This function, when called, writes code for a custom function to be callable from an outside server

Defining a Component
--------------------

Components should extend BabbleBots.component. They have access to the following functions:

### .create(options)

Creates the component and takes advantage of the helper methods in BabbleBots.Component. Options include:

* **type**: 'I2C', 'GPIO' currently supported
* **pinsNeeded**: array of strings representing pins needed, string values include 'OUTPUT', 'PWM', 'ANALOG', 'INPUT'
* **includePaths**: array of strings representing the include paths for this component

### .addInclude(include_path)

Adds the passed include_path to the head of the thin client

And implement the following functions:

### .init(options)

This function writes anything that goes in the init level of the thin client (in C: in the init() function)

### .loop(options)

This function writes anything that goes in the loop() function of the thin client