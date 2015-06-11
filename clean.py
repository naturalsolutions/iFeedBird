#!/usr/bin/python
import RPi.GPIO as GPIO

# Configuration des GPIO
GPIO.setmode(GPIO.BCM)

while True:
    try:
        GPIO.cleanup()

    except KeyboardInterrupt:
        print("[--- CLEANUP (except KeyboardInterrupt) ---]")
        GPIO.cleanup()

    finally:
        print("[--- EXIT (finally) ---]")
