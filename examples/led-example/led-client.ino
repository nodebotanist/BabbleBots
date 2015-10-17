#include "application.h"


SYSTEM_MODE(AUTOMATIC);


#define LED1_PIN D0

#define LED2_PIN D1

void setup(){

  Particle.function("setLED", setLED);

}

void loop(){

}



