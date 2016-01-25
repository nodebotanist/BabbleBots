#include "application.h"

#include Adafruit_TCS34725.h


SYSTEM_MODE(AUTOMATIC);

Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);
int redValue = 0;
int blueValue = 0;
int greenValue = 0;
uint16_t clear, red, green, blue;

void setup(){
    if (!tcs.begin()) {
        System.reset();
    }

    Particle.variable("red", redValue);
    Particle.variable("green", greenValue);
    Particle.variable("blue", blueValue);
}

void loop(){
    tcs.setInterrupt(false);      // turn on LED
    
    delay(60);  // takes 50ms to read 
      
    tcs.getRawData(&red, &green, &blue, &clear);
    tcs.setInterrupt(true);  // turn off LED
    
    // Figure out some basic hex code for visualization
    uint32_t sum = clear;
    float r, g, bl;
    
    r = red; r /= sum;
    g = green; g /= sum;
    bl = blue; bl /= sum;
    r *= 256; g *= 256; bl *= 256;    
    
    redValue = (int)r;
    greenValue = (int)g;
    blueValue = (int)bl;
}

