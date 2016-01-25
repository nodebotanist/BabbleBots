# BabbleBots

BabbleBots is meant to be a library that allows you to declaratively write a thin client for IoT devices-- so you can easily connect them to a Node/Python/Ruby/Go/Whatever server. It's basically a tool so that I don't have to keep writing thin clients for my devices, and so others can make thin-client NodeBots without having to deal with C.

**WARNING:** the API and definitons for this can and will change at a moment's notice. Don't expect API stability for a bit-- I want to be very deliberate but at the same time I'm going to make mistakes and need to fix them.

# How it Works

Install: `npm install -g babblebots`

Run: `babblebots ./path-to-my/build-file.js`

Wanna know what goes in the build files? Check out [an example](https://github.com/nodebotanist/BabbleBots/blob/master/examples/thin-rose-client/thin-rose-client-build.js) or --the docs-- (coming soon-- check out the docs branch!)

# Note

Here are the components this supports:

* Creating a setPin function that allows you to set any pin to any value via REST API
* Neopixels, with function that allows you to set colors on neopixels strands via REST API
* Internet Button, with function that allows you to set the neopixels colors and access accelerometer values and button push events via REST API
* TCS34725 color sensor with variables that allow you to access red green and blue values via REST API

# Goals

* Declare a JSON schema representing your bot, and BabbleBots spits out a language-appropriate file
* Start with Particle Photon/Core support, but add in later:
    * Electric Imp
* Unit tests, unit tests everywhere

## Up Next

* clean up-- add gulp build with jshint/jscs/beautifier
* Docs. All the docs.
* UNIT TESTS. I failed at TDD but I need to put tests in.
* write a spark upload task
* write an actual CLI menu

# Versioning

0.2.61 -- docs push.

0.2.6 -- minor bug fixes and added TCS34725 color sensor

0.2.5 -- minor bug fixes and added Internet Button. Also, dependencies now fetch from GitHub instead of keeping files in BabbleBots repo.

0.2.1 -- I did a major refactor. Build, Platform, and Component now separate concerns much better than they did. Still a lot of cleaning to do.

0.1.0 -- Okay. So, it works. For one component and one platform. Probably needs a ton of cleanup. BUT IT WORKS.

0.0.1 -- Scaffolding set up. exampe files created, build filled out.

0.0.0 -- I have the files set up. Like, the .gitignore and the README. Nothing is here except my goals and the idea (written in JFK after 20 pages of written brainstorming on a plane.)