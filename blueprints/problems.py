from flask import Blueprint, jsonify, request
from models import db, Problem

problems = Blueprint('problems', __name__)
PROBLEMS = [
  {
    "id": "477B",
    "name": "Dreamoon and Sets",
    "index": "B",
    "contest_id": 477,
    "tags": ["math"],
    "points": 300
  },
  {
    "id": "379B",
    "name": "New Year Present",
    "index": "B",
    "contest_id": 379,
    "tags": ["constructive algorithms", "implementation"],
    "points": 300
  },
  {
    "id": "480C",
    "name": "Riding in a Lift",
    "index": "C",
    "contest_id": 480,
    "tags": ["dp", "implementation"],
    "points": 600
  }
]

@problems.route('/')
def root():
    # get parameters
    sort = request.args.get('sort')
    order = request.args.get('order')
    page = request.args.get('page')

    query = db.session.query(Problem)

    offset = 0

    sort_by = None

    if sort is not None :
        if sort == "contest_id" :
            sort_by = Problem.contest_id
        elif sort == "index" :
            sort_by = Problem.contest_index
        elif sort == "points" :
            sort_by = Problem.points
        else :
            sort_by = Problem.name

    if order is not None and order == "desc":
        sort_by = sort_by.desc()


    if page is None :
        page = 1
    else :
        page = int(page)

    page -= 1
    offset = page * 20
    end = offset + 20

    query = query.order_by(sort_by).slice(offset, end)

    result = query.all()

    return jsonify(data=[ i.to_dict() for i in result ])

@problems.route('/<int:contest_id>/<index>')
def get_problem ( contest_id, index ):
    problem = db.session.query(Problem).get( ( contest_id, index ) )
    return jsonify(data=problem.to_dict())
