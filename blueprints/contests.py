from flask import Blueprint, jsonify

contests = Blueprint('contests', __name__)

CONTESTS = [
    {
        'id': 379,
        'participants': 12481,
        'problems': 7,
        'name': 'Good Bye 2013',
        'date': 1343162470
    },
    {
        'id': 477,
        'participants': 5321,
        'problems': 7,
        'name': 'Codeforces Round #272',
        'date': 1343532469
    },
    {
        'id': 480,
        'participants': 9580,
        'problems': 6,
        'name': 'Codeforces Round #274',
        'date': 1335162422
    }
]

@contests.route('/')
def root():
    return jsonify(data=CONTESTS)
