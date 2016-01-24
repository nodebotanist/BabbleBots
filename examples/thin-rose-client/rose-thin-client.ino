#include "application.h"

#include neopixel.h


SYSTEM_MODE(AUTOMATIC);

#define PIXEL_PIN D3
#define PIXEL_COUNT 7
#define PIXEL_TYPE WS2812

Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);

void setup(){
	strip.begin();
	strip.show();,
	Spark.function("pixels", pixels);
}

void loop(){

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