#include "application.h"

#include InternetButton.h


SYSTEM_MODE(AUTOMATIC);

InternetButton b = InternetButton();

int xValue = 0;
int yValue = 0;
int zValue = 0;

void setup(){
    Particle.variable("accelX", xValue);
    Particle.variable("accelY", yValue);
    Particle.variable("accelZ", zValue);
    Particle.function("color", pixels);
    b.begin(1);
    b.allLedsOn(0,20,20);,
	Particle.function("pixels", pixels);
}

void loop(){
    xValue = b.readX();
    yValue = b.readY();
    zValue = b.readZ();
    
    b.allLedsOff();
    
    if(b.buttonOn(1)){
        Particle.publish("buttonpressup");
        delay(400);
    }
    
    if(b.buttonOn(2)){
        Particle.publish("buttonpressright");
        delay(400);
    }
    
    if(b.buttonOn(3)){
        Particle.publish("buttonpressdown");
        delay(400);
    }
    
    if(b.buttonOn(4)){
        Particle.publish("buttonpressleft");
        delay(400);
    }
}

int pixels(String color){
    int bar = color.indexOf('|');
    String index = color.substring(0, bar);
    long indexNum;
    int stopPoint;
    boolean all;
    if(index == "all"){
        indexNum = 0;
        all = true;
    } else {
        indexNum = strtol(index, NULL, 16);
        all = false;
    }
    
    long red, green, blue;
    
    for(int i = bar + 1; i + 5 < color.length(); i+=6 ){
        String newColor = color.substring(i, i + 2);
        red = strtol(newColor, NULL, 16);
        newColor = color.substring(i + 2, i + 4);
        green = strtol(newColor, NULL, 16);
        newColor = color.substring(i + 4, i + 6);
        blue = strtol(newColor, NULL, 16);
        if(all){
            b.allLedsOn(red, green, blue);
        } else {
            b.ledOn(indexNum, red, green, blue);
        }
        indexNum++;
    }
    
    return 1;
}