from flask import Blueprint, jsonify
from models import db, User

users = Blueprint('users', __name__)
USERS = [
  {
    "handle": "Staticity",
    "name": "Jaime Rivera",
    "rank": "specialist",
    "rating": 1530,
    "registration_time": 1458786850,
  },
  {
    "handle": "arknave",
    "name": "Arnav Sastry",
    "rank": "expert",
    "rating": 1766,
    "registration_time": 1363182302
  },
  {
    "handle": "dtalamas24",
    "name": "Daniel Talamas",
    "rank": "candidate master",
    "rating": 2029,
    "registration_time": 1343162470
  },
]

@users.route('/')
def root():
    # get parameters
    sort = request.args.get('sort')
    order = request.args.get('order')
    page = request.args.get('page')

    return jsonify(data=USERS)

@users.route('/<handle>')
def get_user ( handle ):
    user = db.session.query(User).get(handle)
    return jsonify(data=user.to_dict())
