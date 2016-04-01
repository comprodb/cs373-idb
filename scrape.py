from config import SQLALCHEMY_DATABASE_URI
from models import User, Contest, Problem, Submission, db
from sqlalchemy.orm import sessionmaker

import requests

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
        return User (data["handle"], "", data["rank"], data["rating"],
                     data["registrationTimeSeconds"])

def contest_from_data ( data ) :
    # TODO: get rest of contest data (need to generate some)
    # TODO: Allow default values for optional
    return Contest(data['id'], data["name"])

def problem_from_data ( data ) :
    # TODO: give points a default
    if "points" in data:
        return Problem(data["contestId"], data["index"], data["name"], str(data["tags"]), data["points"])
    else:
        return Problem(data["contestId"], data["index"], data["name"], str(data["tags"]), -1)

def submission_from_data ( user, data ) :
    # TODO: give verdict a default
    if "verdict" in data :
        return Submission(data["id"], data["contestId"], data["problem"]["index"], user, data["verdict"])
    else :
        return Submission(data["id"], data["contestId"], data["problem"]["index"], user, "UNKNOWN")

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
        # TODO : remove count parameter when all data is ready to be scraped ( will take a long time )
        r = requests.get("http://codeforces.com/api/user.status?handle={}&count=10".format(user))
        response = r.json()
        if response["status"] != "OK" :
            return []
        data = response["result"]
        submissions.extend([ submission_from_data(user, item) for item in data ])

    return submissions

if __name__ == "__main__" :
    # create a session, fetch codeforces data, and update database
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
    for contest in contests:
        session.merge(contest)
    for problem in problems:
        session.merge(problem)
    for submission in submissions:
        session.merge(submission)

    session.commit()