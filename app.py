from blueprints.contests import contests
from blueprints.problems import problems
from blueprints.users import users
from blueprints.test import test
from blueprints.search import search
from config import SQLALCHEMY_DATABASE_URI, DEBUG_DATABASE_URI
from flask import jsonify, request
from models import app, db

import json
import models
import psycopg2
import requests
import sys
import time
import os.path

app.register_blueprint(contests, url_prefix='/api/contests')
app.register_blueprint(problems, url_prefix='/api/problems')
app.register_blueprint(users, url_prefix='/api/users')
app.register_blueprint(test, url_prefix='/api/test')
app.register_blueprint(search, url_prefix='/api/search')

@app.route('/api/meteors')
def meteors():
    response = jsonify(data=json.loads(requests.get('http://meteorite-landings.me/api/meteorites').text))
    return response

# Routes
@app.route('/')
def root():
    # Send default home page
    return app.send_static_file("index.html")

@app.route('/<path:path>')
def static_proxy(path):
    # Send files from directory ./static/
    if os.path.exists('./static/' + path):
      return app.send_static_file(path)
    else:
      return app.send_static_file('index.html')


if __name__ == "__main__":
    # Wait until the database is running
    db_down = True
    if 'debug' in sys.argv:
        app.config["SQLALCHEMY_DATABASE_URI"] = DEBUG_DATABASE_URI
    else:
        while db_down:
            try:
                psycopg2.connect(SQLALCHEMY_DATABASE_URI).close()
                db_down = False
            except:
                time.sleep(1)
                continue

    # Create any missing tables
    db.create_all()

    # Start server
    app.run(host="0.0.0.0", port=8000)
