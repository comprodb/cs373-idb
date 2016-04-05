from flask import Blueprint, jsonify, request
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

    query = db.session.query(User)

    offset = 0

    sort_by = None

    if sort is not None :
        if sort == "handle" :
            sort_by = User.handle
        elif sort == "rank" :
            sort_by = User.rank
        elif sort == "rating" :
            sort_by = User.rating
        elif sort == "registration_time" :
            sort_by = User.registration_time
        else :
            sort_by = User.name

    if order is not None and order == "desc":
        sort_by = sort_by.desc()


    if page is None :
        page = 1
    else :
        page = int(page)

    page -= 1
    offset = int(page) * 20
    end = offset + 20

    query = query.order_by(sort_by).slice(offset, end)

    result = query.all()

    return jsonify(data=[ i.to_dict() for i in result ])

@users.route('/<handle>')
def get_user ( handle ):
    user = db.session.query(User).get(handle)
    return jsonify(data=user.to_dict())
