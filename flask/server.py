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

# djson = bddjson.BddJson("./static/db.json")

# PROJECT PATH
PHOTOS_DIR_PATH = "/home/pi/NS_iFeedBird/flask/static/photos/"
SQLITE_PATH = 'sqlite:///database/sqlalchemy_example.db'

# EMAIL SETTINGS
fromaddr = ''
toaddr = ''
username = ''
password = ''

# -----------------------------------------------------------------------------

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
        'sudo python /home/pi/NS_iFeedBird/program.py',
        shell=True
        )

    return flux_shell

# -----------------------------------------------------------------------------
# delete json


'''@app.route('/delete/<jpg_id>', methods=['DELETE'])
def delete(jpg_id):
    try:
        djson.delete(jpg_id)
    except Exception as err:
        print("Erreur lors de la suppresion des photos.")
        print(err)

    return json.dumps({'res': True})'''

# -----------------------------------------------------------------------------
# delete sqlite


@app.route('/delete/<jpg_id>', methods=['DELETE'])
def deleteSQLite(jpg_id):
    print(jpg_id)
    engine = create_engine(SQLITE_PATH)
    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    try:
        form = session.query(Photos).filter_by(fname=jpg_id + '.jpg').first()
        print(form)
        session.delete(form)
        session.commit()
    except Exception as err:
        print(err)
        print('Erreur lors de la suppresion de la photo de la base de donnees')

    try:
        subprocess.call(
            'sudo rm ' + PHOTOS_DIR_PATH + jpg_id + '.jpg',
            shell=True
        )
        subprocess.call(
            'sudo rm ' + PHOTOS_DIR_PATH + 'resized_' + jpg_id + '.jpg',
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


@app.route('/photos', methods=['GET'])
def index():
    with open('static/db.json') as file:
        data = json.loads(file.read())
        return json.dumps(data['photos'])

# -----------------------------------------------------------------------------


'''@app.route('/photos', methods=['GET'])
def select_photos():
    engine = create_engine(SQLITE_PATH)

    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    form = session.query(Photos).all

    session.delete(form)
    session.commit()

    return json.dumps({'res': True})'''

# -----------------------------------------------------------------------------

if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
