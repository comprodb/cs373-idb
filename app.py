from config import SQLALCHEMY_DATABASE_URI
from models import app, db

import models
import psycopg2
import time
import os.path

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
