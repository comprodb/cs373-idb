from config import SQLALCHEMY_DATABASE_URI, DEBUG_DATABASE_URI
from flask import jsonify, request
from models import app, db, User

import models
import psycopg2
import sys
import time
import os.path

# Routes
@app.route('/')
def root():
    # Send default home page
    return app.send_static_file("index.html")

@app.route('/api/user/get')
def user_get( ):

    # TODO add error handling for bad handles
    handle = request.args.get('handle')
    user = db.session.query(User).get(handle)
    return jsonify(**user.to_dict())

@app.route('/api/user/list')
def user_list ( ):
    # TODO return all user data ( possible filtered or limited )
    pass

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
