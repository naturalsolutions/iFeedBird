#!/usr/bin/python
import bddjson
import datetime

djson = bddjson.BddJson("db.json")
dt = datetime.datetime.now()
dt = dt.replace(hour=0, minute=0, second=0, microsecond=0)
print(bddjson.where('ID','=',1)[0].__dict__)

# print(bddjson.delete('ID','=',1)[0].__dict__)

print ('toto' in 'la tete a toto')
