#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, request, render_template
import json
import string
import smtplib
import subprocess
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from alchemy import Photos, Base

# PROJECT PATH
SQLITE_PATH = 'sqlite:///database/sqlite.db'

# EMAIL SETTINGS
fromaddr = ''
toaddr = ''
username = ''
password = ''

app = Flask(__name__)

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
    return json.dumps(tab)

# -----------------------------------------------------------------------------


@app.route('/delete/<jpg_id>', methods=['DELETE'])
def deleteSQLite(jpg_id):
    print(jpg_id)
    engine = create_engine(SQLITE_PATH)
    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    try:
        form = session.query(Photos).get(jpg_id)
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
        )
        subprocess.call(
            'sudo rm ' + form.rfpath,
            shell=True
        )
    except Exception as err:
        print(err)
        print('Erreur lors de la suppresion des fichiers jpg')

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
    # send the email
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

if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
