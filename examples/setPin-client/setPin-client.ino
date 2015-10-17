#include "application.h"


SYSTEM_MODE(AUTOMATIC);



void setup(){
Particle.function("setPin", setPin);
}

void loop(){

}

int setPin(String cmd){
    //convert ascii to integer
    int pinNumber = cmd.charAt(1) - '0';
    //Sanity check to see if the pin numbers are within limits
    if (pinNumber< 0 || pinNumber >7) return -1;

    else if (cmd.startsWith("A"))
    {
        pinNumber = pinNumber + 10;
    }
    
    char* myCopy = strtok(strdup(cmd), "|");
    myCopy = strtok(NULL, "|"); 
    int value= atoi(myCopy);
    
    if(value == 0 || value == 1){
        pinMode(pinNumber, OUTPUT);
        digitalWrite(pinNumber, value);
    } else {
        pinMode(pinNumber, OUTPUT);
        analogWrite(pinNumber, value);
    }
    return 1;
    
}

