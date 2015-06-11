#! /usr/bin/python
# -*- coding:utf-8 -*-

from flask import Flask, request, render_template, url_for, jsonify
import json

# -----------------------------------------------------------------------------

app = Flask(__name__)
# app.debug = True
app.secret_key = 'quelaforcesoitavectoi'

# -----------------------------------------------------------------------------


@app.route('/accueil')
@app.route('/index')
@app.route('/')
def main_vue():
    return render_template('index.html')

# -----------------------------------------------------------------------------


@app.route('/contact')
def page_contact():
    return render_template('contact.html')

# -----------------------------------------------------------------------------


@app.route('/apropos')
def page_apropos():
    return render_template('apropos.html')

# -----------------------------------------------------------------------------


@app.route('/photos', methods=['GET'])
def index():
    with open('static/db.json') as file:
        data = json.loads(file.read())
        return json.dumps(data['photos'])
        # return jsonify(json.dumps(file.read()))
        # url_for('static', filename='database.json')

# -----------------------------------------------------------------------------


@app.route('/admin')
@app.route('/administrateur')
@app.route('/administrator')
def redirection_google():
    return redirect('https://www.google.fr/search?client=opera&q=je+ne+suis+pas+un+jambon&sourceid=opera&ie=UTF-8&oe=UTF-8')

# -----------------------------------------------------------------------------


@app.route('/404')
def page_non_trouvee():
    reponse = make_response("Cette page devrait vous avoir renvoyé une erreur 404")
    reponse.status_code = 404
    return reponse

# -----------------------------------------------------------------------------

if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
