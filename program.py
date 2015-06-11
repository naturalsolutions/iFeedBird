#!/usr/bin/python

#
# Projet                    : iFeedBird
# Auteurs                   : Romain Fabbro, Florian Fauchier
#                             www.natural-solutions.eu
# Programme                 : program.py
# Version                   : 0.2
# Derniere modification     : 09-06-2015
# Version Python            : 2.7
# Version lib GPIO          : 0.5.11
#

'''
Programme de prise automatique de photos par detection infrarouge
'''

import smtplib
import string
import time
import picamera
import RPi.GPIO as GPIO
import datetime
import os
import threading
import json
from time import strftime, gmtime

# Configuration des GPIO
GPIO.setmode(GPIO.BCM)    # set GPIO for IR motion Detector
PIR = 21                  # numero du GPIO utilise par la camera
GPIO.setup(PIR, GPIO.IN)  # set le GPIO en entree

# Parametres pour la prise de photos
frames = 1                # nombre d'images par seconde
XRES = 800                # largeur de l'image en pixel
YRES = 600                # hauteur de l'image en pixel

SUNSET_WIN = 17
SUNSET_SUM = 20
SUNRISE_WIN = 9
SUNRISE_SUM = 7
TIME_STOP_PREVIEW = 5
PROJECT_PATH = "/home/pi/iFeedBird/"
PHOTOS_DIRECTORY = "static/photos/"
PHOTOS_DIRECTORY2 = "/home/pi/iFeedBird/flask/static/photos/"
JSON_FILE = "/home/pi/iFeedBird/flask/static/db.json"

# parametres email
fromaddr = 'arpegius.ff@gmail.com'
toaddr = 'arpegius.ff@gmail.com'
username = 'arpegius.ff'
password = ''

# ----------------------------------------------------------------------------
'''
Enregistrement des informations de la photo dans le fichier db.json
'''


def saveJson(fname, heure_capture):
    try:
        with open(JSON_FILE, mode='r') as f1:
            actu = json.load(f1)

        with open(JSON_FILE, mode='w') as f2:
            heure_capture = strftime("%d %m %Y %H:%M:%S")
            # startCaptureString = str(startCapture)
            to_add = {
                    # 'Lien': PROJECT_PATH + 'photos/' + str(fname),
                    'Lien': PHOTOS_DIRECTORY + str(fname),
                    'Heure': heure_capture,
                    'Nom': fname
                    }
            actu["photos"].append(to_add)
            json.dump(actu, f2, indent=4, separators=(',', ': '))
            f2.close()
    except Exception as e:
        print("[--- Erreur lors de l'ecriture JSON ---]")
        print(e)

# ----------------------------------------------------------------------------
'''
Lancement du mode preview et arret si pas de detection apres 3 secondes
'''


def ecoute(PIR):
    try:
        camera = picamera.PiCamera()
        elapsed = 0
        start = datetime.datetime.now()
        print("[--- DETECTION ---]")
        while elapsed == 0 or elapsed.total_seconds() < TIME_STOP_PREVIEW:
            stop = datetime.datetime.now()
            elapsed = stop-start
            if GPIO.input(PIR):
                start = datetime.datetime.now()
                capture(camera)
        if elapsed.total_seconds() >= TIME_STOP_PREVIEW:
            print('[--- STOP CAPTURE ---]')
            camera.close()
    except Exception as e:
        print("[--- PREVIEW FAILED or STOPED ---]")
        print(e)

# ----------------------------------------------------------------------------
'''
Prise de photo avec parametres de l'image
'''


def capture(camera):
    heure_capture = strftime("%d-%m-%Y_%H:%M:%S")
    fname = (heure_capture + '.jpg')
    print(fname)
    camera.capture(fname)
    print(fname)
    print("[--- CAPTURED ---]")
    time.sleep(1)
    moveFileThread = threading.Thread(target=move())
    moveFileThread.start()
    time.sleep(1)
    print("Fichier deplace")
    updateJSONThread = threading.Thread(target=saveJson(fname, heure_capture))
    updateJSONThread.start()
    time.sleep(1)
    print("Info sauvegardees")
    '''send_email(fname)
    print("Email envoye")
    time.sleep(10)'''

# ----------------------------------------------------------------------------
'''
Prise de photo avec parametres de l'imagedatetime.datetime.now().
'''


def capture2(camera):
    heure_capture = strftime("%d-%m-%Y_%H:%M:%S")
    fname = (heure_capture + '.jpg')
    print(fname)
    # source = PROJECT_PATH + fname
    # destination = PROJECT_PATH + 'photos/' + fname
    os.system("raspistill -v -q 100 -w 640 -h 480 -t 1000 -n -o " + fname)
    # os.rename(source, destination)
    print(fname)
    print("[--- CAPTURED ---]")
    time.sleep(1)
    updateJSONThread = threading.Thread(target=saveJson(fname, heure_capture))
    updateJSONThread.start()

# ----------------------------------------------------------------------------
'''
Move picture to an other directory
'''


def move():
    for file in os.listdir(PROJECT_PATH):
        if file.endswith(".jpg"):
            source = PROJECT_PATH + str(file)
            # destination = PROJECT_PATH + 'photos/' + str(file)
            destination = PHOTOS_DIRECTORY2 + str(file)
            os.rename(source, destination)

# ----------------------------------------------------------------------------
'''
Envoyer un mail a la 5eme detection
'''


def send_email(fname):
    BODY = string.join((
        "From: %s" % fromaddr,
        "To: %s" % toaddr,
        "Subject: Test email",
        "",
        "May the Force be with you. %s" % fname,
        ), "\r\n")
    # send the email
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.starttls()
    server.login(username, password)
    server.sendmail(fromaddr, toaddr, BODY)
    server.quit()

# ----------------------------------------------------------------------------
'''
Fonction main, lance la fonction preview a la premiere detection
'''


def main():
    try:
        while True:
            print("READY")
            # Check current local time
            GPIO.VERSION
            GPIO.RPI_INFO
            utc_hour = int(strftime("%H", gmtime()))
            hour = utc_hour + 2
            if (hour < 0):
                hour = hour + 24
            if GPIO.input(PIR) and hour < SUNSET_SUM and hour > SUNRISE_SUM:
                captureThread = threading.Thread(target=ecoute(PIR))
                captureThread.start()
            print("sleep for %d sec" % 2)
            time.sleep(2)

    except KeyboardInterrupt:
        print("[--- CLEANUP (except KeyboardInterrupt) ---]")
        GPIO.cleanup()

    finally:
        print("[--- EXIT (finally) ---]")

# ----------------------------------------------------------------------------

'''
Demarrage du programme :
'''

if __name__ == "__main__":
    main()
