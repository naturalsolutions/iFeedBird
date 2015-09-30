#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship

Base = declarative_base()

# ----------------------------------------------


class Photos(Base):

    __tablename__ = 'photos'

    id = Column(Integer, primary_key=True)
    fname = Column(String(32), nullable=False)
    date = Column(String(32), nullable=False)
    fpath = Column(String(256), nullable=False)
    rfpath = Column(String(256), nullable=False)
    comment = Column(String(256))
    FK_espece = Column('espece', String(64), ForeignKey('especes.id'))

    ficheEspece = relationship('Especes')

    def toJSON(self):
        return {
            "ID": self.id,
            "name": self.fname,
            "path": self.fpath,
            "date": self.date,
            "resized": self.rfpath,
            "comment": self.comment,
            "speciesID": self.FK_espece
        }

# ----------------------------------------------


class Especes(Base):

    __tablename__ = 'especes'

    id = Column(Integer, primary_key=True)
    occurrence = Column(Integer)
    name_fr = Column(String(64))
    name_en = Column(String(64))
    name_la = Column(String(64))
    authority = Column(String(32))
    wingspan = Column(String(16))
    weight = Column(String(16))
    length = Column(String(16))
    red_list_category = Column(String(4))
    distribution = Column(String(256))
    description = Column(String(256))
    # photo1 = Column(String(256))
    # photo2 = Column(String(256))
    # photos = Column(String)
    # photo2 = Column(String(256))
    # photo3 = Column(String(256))

    def toJSON(self):
        return {
            "ID_espece": self.id,
            "frequency": self.occurrence,
            "name_fr": self.name_fr,
            "name_en": self.name_en,
            "name_la": self.name_la,
            "authority": self.authority,
            "wingspan": self.wingspan,
            "weight": self.weight,
            "length": self.length,
            "red_list_category": self.red_list_category,
            "distribution": self.distribution,
            "description": self.description
            # "photo1": self.photo1,
            # "photo2": self.photo2
            # "photos": self.photos
        }

# ----------------------------------------------

engine = create_engine('sqlite:///back/database/sqlite.db')

Base.metadata.create_all(engine)
