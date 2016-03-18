#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, request, render_template
import jinja2
import json
import string
import smtplib
import subprocess
from sqlalchemy import create_engine
from sqlalchemy import update
from sqlalchemy.orm import Session, sessionmaker
from alchemy import Photos, Base
from traceback import print_exc

# PROJECT PATH
SQLITE_PATH = 'sqlite:///database/sqlite.db'

# EMAIL SETTINGS
fromaddr = ''
toaddr = ''
username = ''
password = ''

app = Flask(__name__)
#app.config['DBPATH'] = True

# -----------------------------------------------------------------------------


@app.route('/accueil')
@app.route('/index')
@app.route('/')
def main_vue():
    return render_template('index.html')

# -----------------------------------------------------------------------------


@app.route('/capture_program')
def exec_capture():
    flux_shell = subprocess.call(
       'sudo python /home/pi/iFeedBird/main.py',
        shell=True
        )
    return flux_shell

# -----------------------------------------------------------------------------


@app.route('/photos', methods=['GET'])
def getPhotos():
    engine = create_engine(SQLITE_PATH)
    Base.metadata.bind = engine

    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    listphotos = session.query(Photos).all()
    tab = []
    for each in listphotos:
        tmp = each.toJSON()
        tmp['resized'] = tmp['resized'].split('flask')[-1]
        tmp['path'] = tmp['path'].split('flask')[-1]
        tab.append(tmp)
    print(json.dumps(tab))

    return json.dumps(tab)

# -----------------------------------------------------------------------------


@app.route('/photos/<photo_id>', methods=['GET'])
def getPhotoHD(photo_id):
    engine = create_engine(SQLITE_PATH)
    Base.metadata.bind = engine

    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    try:
        photohd = session.query(Photos).get(photo_id)
        # TODO form = session.query(Photos).get(jpg_id)
        # tab = []
        # for each in photohd:
        #     tmp = each.toJSON()
        #     tmp['path'] = tmp['path'].split('flask')[-1]
        #     tab.append(tmp)
        print(photohd.ficheEspece.toJSON())
        tmp = photohd.toJSON()
    except Exception as err:
        print_exc()
        print('error get photo HD')
    return json.dumps(tmp)

# -----------------------------------------------------------------------------


@app.route('/photos/<photo_id>/species', methods=['GET'])
def getFicheEspece(photo_id):

    engine = create_engine(SQLITE_PATH)
    Base.metadata.bind = engine

    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    try:
        photohd = session.query(Photos).get(photo_id)
        fiche = photohd.ficheEspece

    except Exception as err:
        print_exc()
        print("err get fiche espece")

    return json.dumps(fiche.toJSON())

# -----------------------------------------------------------------------------


@app.route('/photos/<photo_id>', methods=['DELETE'])
def deleteSQLite(photo_id):
    print(photo_id)
    engine = create_engine(SQLITE_PATH)
    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    try:
        form = session.query(Photos).get(photo_id)
        print(form)
        session.delete(form)
        session.commit()
    except Exception as err:
        print(err)
        print('Erreur lors de la suppresion de la photo de la base de donnees')

    try:
        subprocess.call(
            'sudo rm ' + form.fpath,
            shell=True
        ) # os.system('sudo rm ' + form.fpath)
        subprocess.call(
            'sudo rm ' + form.rfpath,
            shell=True
        ) # os.system('sudo rm ' + form.rfpath)
    except Exception as err:
        print(err)
        print('Erreur lors de la suppresion des fichiers jpg')

    return json.dumps({'res': True})

# -----------------------------------------------------------------------------


@app.route('/photos/<photo_id>', methods=['PUT'])
def update_details_photo(photo_id):

    data = request.data
    # comment = request.form['comment']
    print(json.loads(str(data)))

    # engine = create_engine(SQLITE_PATH)
    # Base.metadata.bind = engine
    # DBSession = sessionmaker(bind=engine)
    # session = DBSession()

    # # # request = Photos.insert().values(test=comment)
    # # # rqst = session.update.values(name=name)
    # # tochange = session.query(Photos).get(jpg_id)
    # # rqst = tochange.update.values(name=name)
    # # # stmt = Photos.update().\
    # # #       where(table.c.data == 'value').\
    # # #       values(status='X').\
    # # #       returning(table.c.server_flag,
    # # #                 table.c.updated_timestamp)
    # # print(rqst)

    # session.query().\
    #        filter(Photos.id == jpg_id).\
    #        update({"name": name})

    # session.commit()

    # session.update().where(Photos.id == 5).values(comment="comment")

    return json.dumps({'res': True})

# -----------------------------------------------------------------------------


@app.route('/contactform', methods=['POST'])
def contact():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    BODY = string.join((
        "From: %s" % email,
        "To: %s" % toaddr,
        "Subject: Test email",
        "",
        "Message : %s" % message,
        ), "\r\n")
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.starttls()
    server.login(username, password)
    server.sendmail(fromaddr, toaddr, BODY)
    server.quit()

    return render_template(
        'form_action.html',
        name=name, email=email,
        message=message)

# -----------------------------------------------------------------------------
@app.route('/gallery/upload', methods=['POST'])
def upLoad():
    print('in upload photos')
    engine = create_engine(SQLITE_PATH)
    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    print(request.files)

    return  json.dumps({'res': True})
#------------------------------------------------------------------------------

if __name__ == '__main__':
    app.run('127.0.0.1', debug=True)
