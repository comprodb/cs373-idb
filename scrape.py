from config import SQLALCHEMY_DATABASE_URI, DEBUG_DATABASE_URI
from models import User, Contest, Problem, Submission, db, app
from sqlalchemy.orm import sessionmaker

import requests
import sys

# TODO : add rest of comments and doc strings

def user_from_data ( data ) :
    """ Generates a User record from data returned from the codeforces

    Args:
        data a dictionary containing the information on a codeforces user
    """
    # TODO: Change the model to allow the name to be optional as opposed to
    # hardcoding like here
    if "firstName" in data and "lastName" in data :
        return User (data["handle"], "{} {}".format(data["firstName"], data["lastName"]),
                     data["rank"], data["rating"], data["registrationTimeSeconds"])
    else :
        return User (data["handle"], "Unknown", data["rank"], data["rating"],
                     data["registrationTimeSeconds"])

def contest_from_data ( data ) :
    return Contest(data['id'], data["name"], data.get('startTimeSeconds', 0))

def problem_from_data ( data ) :
    return Problem(data["contestId"], data["index"], data["name"], str(data["tags"]), data.get("points", 0))

def submission_from_data ( user, data ) :
    return Submission(data["id"], data["contestId"], data["problem"]["index"], user, data.get("verdict", "UNKOWN"))

def get_users ( ):
    r = requests.get("http://codeforces.com/api/user.ratedList?activeOnly=true")
    response = r.json()
    if response["status"] != "OK" :
        return []
    data = response["result"]
    return [ user_from_data(item) for item in data ]

def get_contests ( ):
    r = requests.get("http://codeforces.com/api/contest.list")
    response = r.json()
    if response["status"] != "OK" :
        return []
    data = response["result"]
    return [ contest_from_data(item) for item in data ]

def get_problems ( ):
    r = requests.get("http://codeforces.com/api/problemset.problems?")
    response = r.json()
    if response["status"] != "OK" :
        return []
    data = response["result"]["problems"]
    return [ problem_from_data(item) for item in data ]

def get_submissions ( user_names ):
    submissions = []

    for user in user_names :
        # TODO : Only fetch new information through use of first and what is
        # currently in the database
        r = requests.get("http://codeforces.com/api/user.status?handle={}".format(user))
        response = r.json()
        if response["status"] != "OK" :
            return []
        data = response["result"]
        submissions.extend([ submission_from_data(user, item) for item in data ])

    return submissions

if __name__ == "__main__" :
    # create a session, fetch codeforces data, and update database
    if "debug" in sys.argv:
        app.config["SQLALCHEMY_DATABASE_URI"] = DEBUG_DATABASE_URI
    db.create_all()

    Session = sessionmaker(bind=db.engine)
    session = Session()

    users = get_users()
    contests = get_contests()
    problems = get_problems()
    submissions = get_submissions( [user.handle for user in users] )

    # Merge runs either add or update depending on if the record already exists
    for user in users :
        session.merge(user)
    for problem in problems:
        session.merge(problem)
    for submission in submissions:
        session.merge(submission)
    for contest in contests:
        contest.num_users = session.query(Submission).filter(Submission.contest_id ==
                                         contest.id).distinct(Submission.who).count()
        contest.num_problems = session.query(Problem).filter(Problem.contest_id ==
                                      contest.id).count()
        session.merge(contest)

    session.commit()