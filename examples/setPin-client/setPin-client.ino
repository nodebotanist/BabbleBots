#include "application.h"


SYSTEM_MODE(AUTOMATIC);



void setup(){
Particle.function("setPin", setPin);
}

void loop(){

}

int setPin(String cmd){
    char* myCopy = strtok(strdup(cmd), "|");
    String pin = myCopy;
    myCopy = strtok(NULL, ","); 
    int value= atoi(myCopy);

    return 1;
}

