#!/usr/bin/python
# -*- coding: utf-8 -*-
# Autors : Romain Fabbro, Florian Fauchier

import PIL
from PIL import Image
import time
import picamera
import RPi.GPIO as GPIO
import os
import json
import smtplib
import string
from time import strftime, gmtime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from alchemy import Photos, Base

# PROJECT PATH
PROJECT_PATH = "/home/pi/NS_iFeedBird/"
PHOTOS_DIRECTORY = "/home/pi/NS_iFeedBird/flask/static/photos/"
PHOTOS_DIRECTORY_REL = "/static/photos/"
JSON_FILE = "/home/pi/NS_iFeedBird/flask/static/db.json"
SQLITE_PATH_EXAMPLE = "sqlite:///sqlalchemy_example.db"
SQLITE_PATH = "sqlite:///flask/database/database.db"
DISTANCE_TRIGGER = 200

# EMAIL SETTINGS
fromaddr = ''
toaddr = ''
username = ''
password = ''

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


def send_email(fname):
    BODY = string.join((
        "From: %s" % fromaddr,
        "To: %s" % toaddr,
        "Subject: Test email",
        "",
        "May the Force be with you. %s" % fname,
        ), "\r\n")
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.starttls()
    server.login(username, password)
    server.sendmail(fromaddr, toaddr, BODY)
    server.quit()

# ----------------------------------------------------------------------------


def insertjson(fname, heure_capture):
    try:
        with open(JSON_FILE, mode='r') as f1:
            actu = json.load(f1)

        with open(JSON_FILE, mode='w') as f2:
            heure_capture = strftime("%d %m %Y %H:%M:%S")
            to_add = {
                    'Comment': 'None',
                    'speciesID': 'None',
                    'ID': fname.replace(".jpg", ""),
                    'Nom': fname,
                    'Date': heure_capture,
                    'Heure': fname[11:-4],
                    'Lien': PHOTOS_DIRECTORY_REL + str(fname),
                    'Miniature': PHOTOS_DIRECTORY_REL + "resized_" + str(fname)
                    }
            actu["photos"].append(to_add)
            json.dump(actu, f2, indent=4, separators=(',', ': '))
            f2.close()
    except Exception as e:
        print("[--- Erreur lors de l'ecriture JSON ---]")
        print(e)

# ----------------------------------------------------------------------------


def insertsqlite(filename, heure_capture):
    engine = create_engine(SQLITE_PATH_EXAMPLE)
    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    new_photo = Photos(
        fname=filename,
        date=heure_capture,
        fpath=PHOTOS_DIRECTORY_REL + str(filename),
        rfpath=PHOTOS_DIRECTORY_REL + "resized_" + str(filename),
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
    camera.capture(fname)
    move()
    insertjson(fname, heure_capture)
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
                print('\n _______  ___   _______  _______  _______  __   __    __  \n|       ||   | |       ||       ||   _   ||  | |  |  |  | \n|   _   ||   | |  _____||    ___||  |_|  ||  | |  |  |  | \n|  | |  ||   | | |_____ |   |___ |       ||  |_|  |  |  | \n|  |_|  ||   | |_____  ||    ___||       ||       |  |__| \n|       ||   |  _____| ||   |___ |   _   ||       |   __  \n|_______||___| |_______||_______||__| |__||_______|  |__| \n\n')
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
