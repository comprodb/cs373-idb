from flask import Blueprint, jsonify, request
from models import db, Contest

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
def root( ):
    # get parameters
    sort = request.args.get('sort')
    order = request.args.get('order')
    page = request.args.get('page')

    query = db.session.query(Contest)

    offset = 0

    sort_by = None

    if sort is not None :
        if sort == "participants" :
            sort_by = Contest.num_users
        elif sort == "problems" :
            sort_by = Contest.num_problems
        elif sort == "name" :
            sort_by = Contest.name
        elif sort == "date" :
            sort_by = Contest.date
        else :
            sort_by = Contest.id

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

@contests.route('/<int:id>')
def get_contest ( id ):
    contest = db.session.query(Contest).get( id )
    return jsonify(data=contest.to_dict())
