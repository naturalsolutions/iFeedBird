#!/usr/bin/python

import RPi.GPIO as GPIO
import time
import datetime
import sys
import os
# import urllib

# -------------------------------------------------------------------------

GPIO.setmode(GPIO.BCM)         # Utiliser num de GPIO et pas num de Pin
GPIO_PIR = 21                  # Pin GPIO utilisee
GPIO.setup(GPIO_PIR, GPIO.IN)  # Configurer la pin 21 en entree

# Initialisation des variables d'etat du capteur
Current_State = 0
Previous_State = 0

print "Programme de detection de presence par infrarouge"

try:
    print "En attente d'une detection..."
    while GPIO.input(GPIO_PIR) == 1:          # Loop until GPIO_PIR == 1
        Current_State = 0
    print "[-- Pret --]"

    while True:                               # Loop until (CTRL+C)
        Current_State = GPIO.input(GPIO_PIR)  # Lire etat de GPIO_PIR

        if Current_State == 1 and Previous_State == 0:
            print "[-- Mouvement detecte ! --]"


            dateEtHeure = datetime.datetime.now()
            chaineCommande = "raspistill -t 3000 -tl 1000 -w 640 -h 480 -o %s.jpg -v" % str(dateEtHeure).replace(" ", "_")
            # chaineCommande = "raspistill -q 50 -w 640 -h 480 -v >> test.jpeg"
            
            print chaineCommande
            os.system(chaineCommande)              # On lance la commande OS

            Previous_State = 1                # On enregistre l'ancien etat
        elif Current_State == 0 and Previous_State == 1:
            print "[-- Pret --]"
            Previous_State = 0                # Le capteur est a nouveau pret
    time.sleep(1)                             # ??? pourquoi on sleep

# -------------------------------------------------------------------------

except KeyboardInterrupt:
    print "Quit"
    GPIO.cleanup()  # Reinitialisation des parametres GPIOs
