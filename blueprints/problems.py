from flask import Blueprint, jsonify

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
    return jsonify(data=PROBLEMS)
