#!/usr/bin/python
# -*- coding: utf-8 -*-
# Authors: Romain Fabbro, Florian Fauchier

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from time import strftime, gmtime
import RPi.GPIO as GPIO
from PIL import Image
import picamera
import time
import PIL
import os
import sys
sys.path.append('/home/pi/ceillac/flask/alchemy.py')
from alchemy import Photos, Base

# PROJECT PATH
SQLITE_PATH = "sqlite:///flask/database/sqlite.db"
PROJECT_PATH = "/home/pi/ceillac/"
PHOTOS_DIRECTORY = "/home/pi/ceillac/flask/static/photos/"
DISTANCE_TRIGGER = 150

# GPIO SETTINGS
GPIO.setmode(GPIO.BCM)
PIR = 21
ECH = 24
TRI = 23
GPIO.setup(PIR, GPIO.IN)
GPIO.setup(ECH, GPIO.IN)
GPIO.setup(TRI, GPIO.OUT)
GPIO.output(TRI, 0)

# ----------------------------------------------------------------------------


def insertsqlite(filename, heure_capture):
    engine = create_engine(SQLITE_PATH)
    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    new_photo = Photos(
        fname=filename,
        date=heure_capture,
        fpath=PHOTOS_DIRECTORY + str(filename),
        rfpath=PHOTOS_DIRECTORY + "resized_" + str(filename),
        comment='None',
        espece='None'
        )

    session.add(new_photo)
    session.commit()

# ----------------------------------------------------------------------------


def capture(camera):
    heure_capture = strftime("%d-%m-%Y_%H:%M:%S")
    fname = (heure_capture + '.jpg')
    camera.resolution = (1024, 728)
    camera.sharpness = 0
    camera.contrast = 0
    camera.brightness = 50
    camera.saturation = 0
    camera.ISO = 0
    camera.video_stabilization = False
    camera.exposure_compensation = 0
    camera.exposure_mode = 'auto'
    camera.meter_mode = 'average'
    camera.awb_mode = 'auto'
    camera.image_effect = 'none'
    camera.color_effects = None
    camera.rotation = 0
    camera.hflip = False
    camera.vflip = False
    camera.crop = (0.0, 0.0, 1.0, 1.0)
    camera.capture(fname)
    move()
    insertsqlite(fname, heure_capture)
    camera.close()

# ----------------------------------------------------------------------------


def move():
    try:
        for file in os.listdir(PROJECT_PATH):
            if file.endswith(".jpg"):
                source = PROJECT_PATH + str(file)
                destination = PHOTOS_DIRECTORY + str(file)
                os.rename(source, destination)

                basewidth = 300
                img = Image.open(destination)
                wpercent = (basewidth / float(img.size[0]))
                hsize = int((float(img.size[1]) * float(wpercent)))
                img = img.resize((basewidth, hsize), PIL.Image.ANTIALIAS)
                img.save('resized_' + str(file))

                os.rename(
                    'resized_' + str(file),
                    PHOTOS_DIRECTORY + 'resized_' + str(file)
                    )
    except Exception as e:
        print("[--- Le fichier n'a pu etre deplace ---]")
        print(e)

# ----------------------------------------------------------------------------


def main():
    try:
        nb_detection = 0
        while True:
            utc_hour = int(strftime("%H", gmtime()))
            hour = utc_hour + 2
            if (hour < 0):
                hour = hour + 24
            GPIO.output(TRI, 1)
            time.sleep(0.00001)
            GPIO.output(TRI, 0)
            while GPIO.input(ECH) == 0:
                pass
            start = time.time()
            while GPIO.input(ECH) == 1:
                pass
            stop = time.time()
            distance = (stop - start) * 17000
            time.sleep(0.1)
            if GPIO.input(PIR) and distance < DISTANCE_TRIGGER:
                nb_detection = nb_detection + 1
                print('! ' + str(nb_detection) + ' !')
                camera = picamera.PiCamera()
                capture(camera)
            time.sleep(0.1)

    except KeyboardInterrupt:
        print("[--- KeyboardInterrupt && clean up ---]")
        GPIO.cleanup()

    finally:
        print("[--- EXIT (finally) ---]")

# ----------------------------------------------------------------------------


if __name__ == "__main__":
    main()
