#!/usr/bin/python
import bddjson
import datetime

dt = datetime.datetime.now()
dt = dt.replace(hour=0, minute=0, second=0, microsecond=0)

# remplace la selection de la photo depuis backbone en attendant
jpg_id = "1"

# instance classe BddJson
# djson = bddjson.BddJson("./flask/static/db.json")
djson = bddjson.BddJson("db.json")

# djson.delete(jpg_id)
# print(bddjson.where('ID', '=', 1)[0].__dict__)
# print(djson.where('ID', '=', '1')[0].__dict__)

attribut = "obiwan"
valeur = "kenobi"

djson.insert(jpg_id, attribut, valeur)
