import json
import datetime
import operator

PHOTOS_DIR_PATH = "/home/pi/www/flask/static/photos/"
SERVER_DIR_PATH = "/home/pi/www/flask/"
IFEEDB_DIR_PATH = "/home/pi/iFeedBird"

# -----------------------------------------------------------------------------
# from : ecoReleve-Server/ecorelevesensor/utils/eval.py


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


class BddJson (Eval):

    listeObjJson = []

    def __init__(self, jsonfile):
        json_data = open(jsonfile).read()
        listeObjJson = json.loads(json_data)['photos']
        self.listObj = [Photo(**obj) for obj in listeObjJson]
        # self.listObj = listeObjJson

    def where(self, attr, operator, value):
        result = list(filter(lambda x : self.eval(getattr(x, attr), operator, value), self.listObj))
        # result =list(filter(lambda x : self.eval(x[attr],operator,value),self.listObj))
        return result

    def delete(listObj):
        # photo_id = "5"
        
        # recupere le path de la photo, puis supprimer
        photo_name = 
        photo_path = PHOTOS_DIR_PATH + photo_name
        try:
            os.system("rm %s" % jpg_path)
            print("[--- Photo " + photo_name + " correctement supprimee ---]")
        except Exception, e:
            raise e
        

        # faire la liste moins l'element a delete
        result = list(filter(lambda x : self.eval(getattr(x, attr), operator, value), self.listObj))
        
        # faire le save avec la nouvelle liste
        save()

    def save(self):
        dictTo_dump = {'photos': []}
        json.dumps(self.listObj)

# -----------------------------------------------------------------------------


class Photo:

    dt_format = "%d %m %Y %H:%M:%S"

    def __init__(self, ID, Heure, Lien, Nom):
        self.ID = ID
        self.Heure = datetime.datetime.strptime(Heure, self.dt_format)
        self.Lien = Lien
        self.Nom = Nom
