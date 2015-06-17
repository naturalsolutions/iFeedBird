#!/usr/bin/python

# ################################################################
#
# Projet                    : iFeedBird
# Auteurs                   : Romain Fabbro, Florian Fauchier
#                             www.natural-solutions.eu
# Programme                 : bddjson.py
# Version                   : 0.1
# Derniere modification     : 17-06-2015
# Version Python            : 2.7
#
# ################################################################

import json
import datetime
import operator
import os

JSON_FILE_PATH = "/home/pi/iFeedBird/flask/static/db.json"
PHOTOS_DIR_PATH = "/home/pi/iFeedBird/flask/static/photos/"


# -----------------------------------------------------------------------------

class Eval:

    def get_operator_fn(self, op):
        return {
            '<': operator.lt,
            '>': operator.gt,
            '=': operator.eq,
            '<>': operator.ne,
            '<=': operator.le,
            '>=': operator.ge,
            '!=': operator.ne,
            }[op]

    def eval(self, attrVal, operator, val):
        attrVal, val = attrVal, val
        if(operator == 'Contains'):
            print('Contains')
            return val in attrVal
        return self.get_operator_fn(operator)(attrVal, val)

# -----------------------------------------------------------------------------


class BddJson(Eval):

    listeObjJson = []

    def __init__(self, jsonfile):
        json_data = open(jsonfile).read()
        listeObjJson = json.loads(json_data)['photos']
        self.listObj = [Photo(**obj) for obj in listeObjJson]
        # self.listObj = listeObjJson

    # ----------------------------------------

    def where(self, attr, operator, value):
        try:
            result = list(filter(lambda x: self.eval(
                getattr(x, attr), operator, value
                ), self.listObj))
            return result
        except Exception as err:
            print("[--- where : Erreur lors de l'ecriture JSON ---]")
            print(err)

    # ----------------------------------------

    def delete(self, jpg_id):
        try:
            listeObjets = json.load(open(JSON_FILE_PATH))
            listeObjets = list(filter(
                lambda x: x['ID'] != jpg_id, listeObjets['photos']
                ))
            self.saveJson(listeObjets)

            photo_path = PHOTOS_DIR_PATH + jpg_id + ".jpg"
            if os.path.isfile(photo_path):
                os.remove(photo_path)
            else:
                print("Error: %s file not found" % photo_path)
        except Exception as err:
            print("[--- delete : Erreur lors de l'ecriture JSON ---]")
            print(err)

    # ----------------------------------------

    def saveJson(self, listeObjets):
        try:
            with open(JSON_FILE_PATH, mode='r') as f1:
                fichierOuvert = json.load(f1)

            with open(JSON_FILE_PATH, mode='w') as f2:
                fichierOuvert["photos"] = listeObjets
                json.dump(fichierOuvert, f2, indent=4, separators=(',', ': '))
                f2.close()
        except Exception as e:
            print("[--- saveJson : Erreur lors de l'ecriture JSON ---]")
            print(e)

    # ----------------------------------------

    # si plusieurs entrees en meme temps
    # params etant un tableau de tableaux
    # def insert(self, params):

    def insert(self, jpg_id, attribut, valeur):
        try:
            with open(JSON_FILE_PATH, mode='r') as f1:
                listeObjets = json.load(f1)

            with open(JSON_FILE_PATH, mode='w') as f2:
                # si besoin de teableaux :
                # for each in params
                for item in listeObjets['photos']:
                    if item['ID'] == jpg_id:
                        item[attribut] = valeur
                        break
                json.dump(listeObjets, f2, indent=4, separators=(',', ': '))
                f2.close()
        except Exception as err:
            print("[--- insert : Erreur lors de l'ecriture JSON ---]")
            print(err)

# -----------------------------------------------------------------------------


class Photo:

    dt_format = "%d %m %Y %H:%M:%S"

    def __init__(self, ID, Heure, Lien, Nom):
        self.ID = ID
        self.Heure = datetime.datetime.strptime(Heure, self.dt_format)
        self.Lien = Lien
        self.Nom = Nom
