#include "application.h"

#include neopixel.h


SYSTEM_MODE(AUTOMATIC);

#define PIXEL_PIN_NEOPIXELS1 D3
#define PIXEL_COUNT_NEOPIXELS1 7
#define PIXEL_TYPE_NEOPIXELS1 WS2812

Adafruit_NeoPixel strip_neopixels1 = Adafruit_NeoPixel(PIXEL_COUNT_NEOPIXELS1, PIXEL_PIN_NEOPIXELS1, PIXEL_TYPE_NEOPIXELS1);

void setup(){
	strip_neopixels1.begin();
	strip_neopixels1.show();,
	Particle.function("pixels_neopixels1", pixels_neopixels1);
}

void loop(){

}

int pixels_neopixels1(String color){
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
            for(int led = 0; led < strip.numPixels(); led+=1){
                strip.setPixelColor(led, strip.Color(red, green, blue));
            }
        } else {
            strip.setPixelColor(indexNum, strip.Color(red, green, blue));
        }
        indexNum++;
    }
    
    strip.show();
    
    return 1;
}