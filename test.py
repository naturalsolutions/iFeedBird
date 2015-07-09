#!/usr/bin/python
import bddjson
import datetime

dt = datetime.datetime.now()
dt = dt.replace(hour=0, minute=0, second=0, microsecond=0)

jpg_id = ""
attribut = ""
valeur = ""

djson = bddjson.BddJson("./flask/static/db.json")

# djson.delete(jpg_id)
# newPhoto = bddjson.Photo(Lien =  "/static/photos/18-07-2015_11:16:24.jpg")
# djson.insert(newPhoto)
print(djson.where('Date', '<', dt)[0].toJSON())
# djson.insert(jpg_id, attribut, valeur)
