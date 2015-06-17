#!/usr/bin/python
import bddjson
import datetime

dt = datetime.datetime.now()
dt = dt.replace(hour=0, minute=0, second=0, microsecond=0)

djson = bddjson.BddJson("db.json")
jpg_id = "17-06-2015_10:27:10"
djson.delete(jpg_id)

# print(bddjson.where('ID', '=', 1)[0].__dict__)
# print(djson.where('ID', '=', 1)[0].__dict__)
# print(bddjson.delete())
# print(bddjson.delete2(jpg_id))
# djson.delete3(jpg_id)
# print("toto" in "la tete a toto")
