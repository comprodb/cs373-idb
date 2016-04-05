from flask import Blueprint, jsonify
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

    return jsonify(data=PROBLEMS)

@problems.route('/<int:contest_id>/<index>')
def get_problem ( contest_id, index ):
    problem = db.session.query(Problem).get( ( contest_id, index ) )
    return jsonify(data=problem.to_dict())
