#!/usr/bin/python
# -*- coding: utf-8 -*-
# modif : limite des prises photo dans le temps

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from time import strftime, gmtime
import RPi.GPIO as GPIO
import threading
import time
import os
import sys
sys.path.append('/home/pi/iFeedBird/flask/alchemy.py')
from alchemy import Photos, Base

SQLITE_PATH = "sqlite:///flask/database/sqlite.db"
PROJECT_PATH = "/home/pi/iFeedBird/"
PHOTOS_DIRECTORY = "/home/pi/iFeedBird/flask/static/photos/"

# GPIO SETTINGS
GPIO.setmode(GPIO.BCM)
PIR = 21
GPIO.setup(PIR, GPIO.IN)

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
        rfpath=PHOTOS_DIRECTORY + "rszd_" + str(filename),
        comment='None',
        espece='None'
        )

    session.add(new_photo)
    session.commit()

# ----------------------------------------------------------------------------


def capture():
    heure_capture = strftime("%d-%m-%Y_%H:%M:%S")
    fname = (heure_capture + '.jpg')
    source = PHOTOS_DIRECTORY + fname
    os.system("raspistill -t 10 -o " + source + " -n -w 1024 -h 768 -q 50")
    sqliteThread = threading.Thread(target=insertsqlite(fname, heure_capture))
    sqliteThread.start()
    print('Capture done.')

# ----------------------------------------------------------------------------


def main():
    try:
        print('ready...')
        nb_detection = 0

        while True:
            print('while True')
            utc_hour = int(strftime("%H", gmtime()))
            hour = utc_hour + 2
            if (hour < 0):
                hour = hour + 24
            currentTime = time.time()

            if GPIO.input(PIR):
                if nb_detection == 0:
                    endStart = time.time() + 60
                    print(str(nb_detection))

                if nb_detection < 3:
                    if currentTime >= endStart:
                        endStart = time.time() + 60
                        nb_detection = 0
                        print(str(nb_detection))

                    print('Capture en cours...')
                    capture()
                    nb_detection = nb_detection + 1
                    print('nb_detection : ' + str(nb_detection))
                    time.sleep(1)

                elif currentTime >= endStart:
                    nb_detection = 0

            time.sleep(0.5)

    except KeyboardInterrupt:
        print("[--- KeyboardInterrupt && clean up ---]")
        GPIO.cleanup()

    finally:
        print("[--- EXIT (finally) ---]")
        GPIO.cleanup()

# ----------------------------------------------------------------------------


if __name__ == "__main__":
    main()
