# BabbleBots

BabbleBots is meant to be a library that allows you to declaratively write a thin client for IoT devices-- so you can easily connect them to a Node/Python/Ruby/Go/Whatever server. It's basically a tool so that I don't have to keep writing thin clients for my devices, and so others can make thin-client NodeBots without having to deal with C.

**WARNING:** the API and definitons for this can and will change at a moment's notice. Don't expect API stability for a bit-- I want to be very deliberate but at the same time I'm going to make mistakes and need to fix them.

# Goals

* Declare a JSON schema representing your bot, and BabbleBots spits out a language-appropriate file
* Start with Particle Photon/Core support, but add in later:
    * Electric Imp
* Unit tests, unit tests everywhere

## Up Next

* write a spark upload task
* write an actual CLI menu

# Versioning

0.1.0 -- Okay. So, it works. For one component and one platform. Probably needs a ton of cleanup. BUT IT WORKS.

0.0.1 -- Scaffolding set up. exampe files created, build filled out.

0.0.0 -- I have the files set up. Like, the .gitignore and the README. Nothing is here except my goals and the idea (written in JFK after 20 pages of written brainstorming on a plane.)