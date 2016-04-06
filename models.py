from config import SQLALCHEMY_DATABASE_URI
from flask import Flask, send_from_directory
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

import ast

# Create Flask server
app = Flask(__name__)

# Allow db config to change depending on development vs production
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)

class User(db.Model):
    """Codeforces user
    """
    __tablename__ = "USER"
    handle = db.Column(db.Text, primary_key=True)
    """User's unique handle"""

    name = db.Column(db.Text)
    """User's given name"""

    rank = db.Column(db.Text)
    """User's codeforces rank (String)"""

    rating = db.Column(db.Integer)
    """User's codeforces rating (int)"""

    registration_time = db.Column(db.Integer)
    """When user created codeforces account in seconds"""

    def __init__(self, handle, name, rank, rating, registration_time):
        self.handle = handle
        self.name = name
        self.rank = rank
        self.rating = rating
        self.registration_time = registration_time

    def __repr__(self):
        return self.handle

    def to_dict ( self ) :
        return {
            'handle': self.handle,
            'name': self.name,
            'rank': self.rank,
            'rating': self.rating,
            'registration_time': self.registration_time,
        }


class Contest(db.Model):
    """Codeforces contest
    """
    __tablename__ = "CONTEST"
    id = db.Column(db.Integer, primary_key=True)
    """Contest's unique id"""

    name = db.Column(db.Text)
    """Name of contest"""

    date = db.Column(db.Integer)
    """Date of the contest in unix time"""

    num_users = db.Column(db.Integer)
    """Number of users for the contest"""

    num_problems = db.Column(db.Integer)
    """Number of problems in the contest"""

    #problem_id = db.Column(db.Text, db.ForeignKey("PROBLEM.contest_index"))
    #problem =  relationship("Problem")

    def __init__(self, id, name, date=0, num_users=0, num_problems=0):
        self.id = id
        self.name = name
        self.date = date
        self.num_users = num_users
        self.num_problems = num_problems

    def __repr__(self):
        return self.name

    def to_dict ( self ) :
        return {
            "id" : self.id,
            "participants" : self.num_users,
            "problems" : self.num_problems,
            "name" : self.name,
            "date" : self.date,
        }

class Problem(db.Model):
    __tablename__ = "PROBLEM"
    contest_id = db.Column(db.Integer, primary_key=True)
    """Contest that the problem is part of.

    With index, forms a unique id"""
    contest_index = db.Column(db.Text, primary_key=True)
    """Index into contest. With contest_id, forms a unique id"""

    name = db.Column(db.Text)
    """Problem's name"""

    tags = db.Column(db.Text)
    """Description of which strategies can be used to solve this problem"""

    points = db.Column(db.Float)
    """Value of the problem in the competition"""

    def __init__(self, contest_id, contest_index, name, tags, points):
        self.contest_id = contest_id
        self.contest_index = contest_index
        self.name = name
        self.tags = tags
        self.points = points

    def __repr__(self):
        return self.name

    def to_dict ( self ) :
        return {
            "id" : str(self.contest_id) + self.contest_index,
            "name" : self.name,
            "index" : self.contest_index,
            "contest_id" : self.contest_id,
            "tags" : ast.literal_eval(self.tags),             # NOTE: please forgive me for this
            "points" : self.points,
        }


class Submission(db.Model):
    __tablename__ = "SUBMISSION"
    submission_id = db.Column(db.Integer, primary_key=True)
    """Contest that the problem is part of."""

    contest_id = db.Column(db.Integer)
    """Contest that the problem is part of.

    With index, forms a unique id"""
    contest_index = db.Column(db.Text)
    """Index into contest.

    With contest_id, forms a unique id"""
    who = db.Column(db.Text)
    """Submitter's name"""

    verdict = db.Column("verdict", db.Enum("FAILED", "OK", "PARTIAL", "COMPILATION_ERROR",
                                           "RUNTIME_ERROR", "WRONG_ANSWER", "PRESENTATION_ERROR",
                                           "TIME_LIMIT_EXCEEDED", "MEMORY_LIMIT_EXCEEDED", "IDLENESS_LIMIT_EXCEEDED",
                                           "SECURITY_VIOLATED", "CRASHED", "INPUT_PREPARATION_CRASHED", "CHALLENGED",
                                           "SKIPPED", "TESTING", "REJECTED", "UNKNOWN", name="verdict"))
    """Result of submission"""

    def __init__(self, submission_id, contest_id, contest_index, who, verdict):
        self.submission_id = submission_id
        self.contest_id = contest_id
        self.contest_index = contest_index
        self.who = who
        self.verdict = verdict

    def __repr__(self):
        return str(self.submission_id)
