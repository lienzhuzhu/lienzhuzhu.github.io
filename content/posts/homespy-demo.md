+++
title = "Your TV remote is not safe, demonstration."
date = "2023-07-30T10:07:01-07:00"
# description = "A basic demonstration of how TV IR signal can be sniffed."

tags = ["academic","security",]
+++

### Introduction

In the previous post, I shared a summary of HomeSpy, a paper presented at USENIX '23. Then I had the revelation that I have some of the crucial hardware needed to demonstrate the key insights of the contributions from a $50 Arduino kit purchased on Amazon.
	

### Hardware

Here is the simple set up:

!["receiver setup"](/blog/images/ir-setup.JPG)

The wiring is simple, only one data line.

The receiver in more detail:

!["receiver module"](/blog/images/ir-receiver.jpeg)

Black is ground, Red is 5V, and White is connected to digital pin 4. Whenever the IR receiver gets a signal, it transmits the signal across the white wire to digital pin 4 where it is translated into bytes.


### Software

The following code prints the manufacturer and the IR code received after every button press.
Make sure you have version **2.2.3** of the IR Remote library made by Ken Shirriff.

```c
/*  IR demo code
 *   lienzhu.tech/blog
 */

// Include IR Remote Library by Ken Shirriff
#include <IRremote.h>

// Define sensor pin
const int RECV_PIN = 4;


// Define IR Receiver and Results Objects
IRrecv irrecv(RECV_PIN);
decode_results results;


void setup() {
    Serial.begin(9600);
    irrecv.enableIRIn(); // Enable the IR Receiver
}

void loop() {
    if (irrecv.decode(&results)) {
        switch (results.decode_type){
            case NEC: 
                Serial.println("NEC"); 
            break;
            case SONY: 
                Serial.println("SONY"); 
            break;
            case RC5: 
                Serial.println("RC5"); 
            break;
            case RC6: 
                Serial.println("RC6"); 
            break;
            // case DISH: 
            //     Serial.println("DISH"); 
            // break;
            case SHARP: 
                Serial.println("SHARP"); 
            break;
            case JVC: 
                Serial.println("JVC"); 
            break;
            // case SANYO: 
            //     Serial.println("SANYO"); 
            // break;
            // case MITSUBISHI: 
            //     Serial.println("MITSUBISHI"); 
            // break;
            case SAMSUNG: 
                Serial.println("SAMSUNG"); 
            break;
            case LG: 
                Serial.println("LG"); 
            break;
            case WHYNTER: 
                Serial.println("WHYNTER"); 
            break;
            // case AIWA_RC_T501: 
            //     Serial.println("AIWA_RC_T501"); 
            // break;
            case PANASONIC: 
                Serial.println("PANASONIC"); 
            break;
            case DENON: 
                Serial.println("DENON"); 
            break;
            default:
            case UNKNOWN: 
                Serial.println("UNKNOWN"); 
            break;
        }
        Serial.println(results.value, HEX);
        Serial.println();
        //receive the next value
        irrecv.resume();
    }
}

```

### Results

My remote has numbers so to imitate the D-pad, I used the volume control buttons and rewind, fast-forward buttons as a D-pad.

```bash
NEC
FF629D      # VOL+

NEC
FF22DD      # REWIND

NEC
FFA857      # VOL-

NEC
FFC23D      # FAST FORWARD

NEC
FFFFFFFF    # REPEAT


# After re-compiling and re-uploading to the board
UNKNOWN
5DDFB71D    # Noise?

NEC
FF629D      # VOL+ 

NEC
FF22DD      # REWIND

NEC
FFA857      # VOL-

NEC
FFC23D      # FAST FORWARD
```

### Discussion

The IR receiver library appears to interpret the signal as following NEC's protocol.

As we can see, 0xFFFFFFFF is the code that is sent when a user holds down a key.

And that's how easy it is to capture IR signal. The receiver could successfully capture signal not directly pointed at it from across my apartment living room.

It would be hard for the Arduino to send the captured data to a remote server for processing on its own because the Arduino Uno lacks WiFi or BLE capabilities. However, this article still demonstrates how easy it is to capture IR signals using a cheap IR receiver module and a cheap MCU board.
