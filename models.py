from config import SQLALCHEMY_DATABASE_URI
from flask import Flask, send_from_directory
from flask.ext.sqlalchemy import SQLAlchemy

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

class Contest(db.Model):
    """Codeforces contest
    """
    __tablename__ = "CONTEST"
    id = db.Column(db.Integer, primary_key=True)
    """Contest's unique id"""
    name = db.Column(db.Text)
    """Name of contest"""
    difficulty = db.Column(db.Integer)
    """Contest difficulty from 1-5"""
    scoring_type = db.Column(db.Enum("CF", "IOI", "ICPC", name="scoring_type"))
    """How the contest is scored (CF, IOI, or ICPC style)"""
    contest_phase = db.Column(db.Enum("BEFORE", "CODING", "PENDING_SYSTEM_TEST", "SYSTEM_TEST",
                                          "FINISHED", name="contest_phase"))
    """
    Contest status of Before, Coding, Pending system test, System test, and Finished
    """

    def __init__(self, id, name, difficulty, scoring_type, phase):
        self.id = id
        self.name = name
        self.difficulty = difficulty
        self.scoring_type = scoring_type
        self.phase = phase

    def __repr__(self):
        return self.name

class Problem(db.Model):
    __tablename__ = "PROBLEM"
    contest_id = db.Column(db.Integer, primary_key=True)
    """Contest that the problem is part of.

    With index, forms a unique id"""
    index = db.Column(db.Text, primary_key=True)
    """Index into contest.

    With contest_id, forms a unique id"""
    name = db.Column(db.Text)
    """Problem's name"""
    problem_type = db.Column("problem_type", db.Enum("PROGRAMMING", "QUESTION", name="problem_type"))
    """Problem type of either programming or question"""
    points = db.Column(db.Float)

    def __init__(self, contest_id, index, name, problem_type, points):
        self.contest_id = contest_id
        self.index = index
        self.name = name
        self.problem_type = problem_type
        self.points = points

    def __repr__(self):
        return self.name
