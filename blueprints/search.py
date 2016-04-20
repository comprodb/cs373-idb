from flask import Blueprint, jsonify, request
from models import db, Contest, Problem, User
from functools import reduce
from sqlalchemy import and_, or_

search = Blueprint('search', __name__)

def partial_contest_query ( i ):
    is_number = i.isdigit()

    query = Contest.name.like('%{}%'.format(i))

    if is_number :
        val = int(i)

        query |= Contest.id == val
        query |= Contest.num_users == val
        query |= Contest.num_problems == val

    return query

def partial_problem_query ( i ):
    query = or_(Problem.name.like('%{}%'.format(i)), Problem.tags.like('%{}%'.format(i)), Problem.contest_index.like('%{}%'.format(i)))

    is_number = i.isdigit()
    if is_number :
        val = int(i)
        query |= Problem.contest_id == val

    try :
        val = float(i)
        query |= Problem.points == val
    except :
        pass

    return query

def partial_user_query ( i ):

    is_number = i.isdigit()

    query = or_(User.name.like('%{}%'.format(i)),
                User.rank.like('%{}%'.format(i)),
                User.handle.like('%{}%'.format(i)))

    if is_number :
        val = int(i)

        query |= User.rating == val

    return query

@search.route('/')
def root( ):
    # get parameters
    terms = request.args.get('query').split()

    # filter for records containing all items
    user_all_filter = and_( *map( partial_user_query, terms ))
    contest_all_filter = and_( *map( partial_contest_query, terms ))
    problem_all_filter = and_( *map( partial_problem_query, terms ))


    # get results for each table
    all_results = {}
    all_results['users'] = [ i.to_dict() for i in db.session.query(User).filter(user_all_filter).all()]
    all_results['contests'] = [ i.to_dict() for i in db.session.query(Contest).filter(contest_all_filter).all()]
    all_results['problems'] = [ i.to_dict() for i in db.session.query(Problem).filter(problem_all_filter).all()]

    # filter for records containing any item and not already obtained (by checking primary key)
    contest_some_filter = (or_( *map( partial_contest_query, terms )) &
                ~Contest.id.in_(list(map(lambda i:i['id'], all_results['contests']))) )
    problem_some_filter = (or_( *map( partial_problem_query, terms )) &
                ~(Problem.contest_id.in_(list(map(lambda i:i['contest_id'], all_results['problems'])))
                & Problem.contest_index.in_(list(map(lambda i:i['index'], all_results['problems']))) ))
    user_some_filter = (or_( *map( partial_user_query, terms )) &
                ~User.handle.in_(list(map(lambda i:i['handle'], all_results['users'])))  )

    # get results for each table
    some_results = {}
    some_results['users'] = [ i.to_dict() for i in db.session.query(User).filter(user_some_filter).all()]
    some_results['contests'] = [ i.to_dict() for i in db.session.query(Contest).filter(contest_some_filter).all()]
    some_results['problems'] = [ i.to_dict() for i in db.session.query(Problem).filter(problem_some_filter).all()]


    # return data in one object
    query_result = { 'all' : all_results, 'some' :some_results }

    return jsonify(data=query_result)
