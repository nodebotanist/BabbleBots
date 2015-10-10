# Defining a BabbleBots Platform

A platform represents a microcontroller that BabbleBots will write thin clients for. the Platform module (at /lib/platform.js) contains some utilities 
to help you *and* the buid command that is used to call platform deifnitions in order to create the thin clients.

## Platform module utilities

**Platform.pinType:** an object mapping out common pin types to numbers used internally by BabbleBots. The types available are *INPUT, OUTPUT, ANALOG, PWM, SERVO,* and *I2C*.

## Creating the platform files

Your platform needs to be a CommonJS module that exports a build() function that ...Huh. Just realized this needs a giant refactor.

What I want it to do: export a set of strings representing each section of the application, which BabbleBots will take care of writing to the destination file. 

I'll update this when I have that done.

## Adding the platform to BabbleBots

**TODO: Add functions to load external platforms in build files.**