# from io       import StringIO
# from random   import randint
# import requests
from config import TEST_DATABASE_URI
from models import *
from sqlalchemy.orm import sessionmaker
from unittest import main, TestCase

# ------------
# TestComProDB
# ------------

class TestComProDB (TestCase) :

    #-----
    # User
    #-----

    def test_User_1 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # handle, name, rank, rating, registration_time
        u = User('a','b','c',1,2)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(User).all())

        session.add(u)

        self.assertEqual(len(session.query(User).all()),orig_length + 1)

        session.rollback()

    def test_User_2 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # handle, name, rank, rating, registration_time
        u1 = User('a','b','c',1,2)
        u2 = User('d','e','f',3,4)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(User).all())

        session.add(u1)
        session.add(u2)

        l = session.query(User).all()

        self.assertEqual(len(l),orig_length + 2)

        self.assertTrue(u1 in l)
        self.assertTrue(u2 in l)

        session.rollback()

    def test_User_3 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # handle, name, rank, rating, registration_time
        u1 = User('a','b','c',1,2)
        u2 = User('d','e','f',3,4)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(User).all())

        session.add(u1)
        session.add(u1)
        session.add(u2)
        session.add(u2)

        l = session.query(User).all()

        self.assertEqual(len(l),orig_length + 2)

        self.assertTrue(u1 in l)
        self.assertTrue(u2 in l)

        session.rollback()

    def test_User_4 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # handle, name, rank, rating, registration_time
        handle = 'a'
        name = 'b'
        rank = 'c'
        rating = 1
        registration_time = 2
        u1 = User(handle,name,rank,rating,registration_time)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(User).all())

        session.add(u1)

        l = session.query(User).all()

        self.assertEqual(len(l),orig_length + 1)

        self.assertTrue(u1 in l)

        for user in l :
            if user is u1:
                self.assertEqual(handle, user.__repr__())


        session.rollback()
	
    def test_User_5 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # handle, name, rank, rating, registration_time
        u1 = User('a','b','c',1,2)
        u2 = User('a','b','c',1,2)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(User).all())

        try:
            session.add(u1)
            session.add(u2)
            l = session.query(User).all()
            self.assertTrue(False)
        except AssertionError as e:
            raise e
        except Exception:
            pass

        session.rollback()

    def test_User_6 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # handle, name, rank, rating, registration_time
        u1 = User('a','b','c',1,2)
        u2 = User('a','c','f',12,50)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(User).all())

        try:
            session.add(u1)
            session.add(u2)
            l = session.query(User).all()
            self.assertTrue(False)
        except AssertionError as e:
            raise e
        except Exception:
            pass

        session.rollback()

    #--------
    # Contest
    #--------

    def test_Contest_1 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # id, name, date, num_users, num_problems
        c = Contest(0,'name',1,2,3)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Contest).all())

        session.add(c)

        self.assertEqual(len(session.query(Contest).all()),orig_length + 1)

        session.rollback()

    def test_Contest_2 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # id, name, date, num_users, num_problems
        c1 = Contest(0, "stuff", 1, 2, 3)
        c2 = Contest(4, "name", 5, 6, 7)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Contest).all())

        session.add(c1)
        session.add(c2)

        l = session.query(Contest).all()

        self.assertEqual(len(l),orig_length + 2)

        self.assertTrue(c1 in l)
        self.assertTrue(c2 in l)

        session.rollback()

    def test_Contest_3 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # id, name, date, num_users, num_problems
        c1 = Contest(500, "name", 0, 500, 0)
        c2 = Contest(502, "name", 1, 2, 3)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Contest).all())

        session.add(c1)
        session.add(c1)
        session.add(c2)
        session.add(c2)

        l = session.query(Contest).all()

        self.assertEqual(len(l),orig_length + 2)

        self.assertTrue(c1 in l)
        self.assertTrue(c2 in l)

        session.rollback()

    def test_Contest_4 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # id, name, date, num_users, num_problems
        c = Contest(502,"sample_name",24,0,50)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Contest).all())

        session.add(c)

        l = session.query(Contest).all()

        self.assertEqual(len(l),orig_length + 1)

        self.assertTrue(c in l)

        for contest in l :
            if contest is c:
                self.assertEqual("sample_name", contest.__repr__())


        session.rollback()

    def test_Contest_5 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # id, name, date, num_users, num_problems
        c1 = Contest(0, "name", 0, 0, 0)
        c2 = Contest(0, "name", 0, 0, 0)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Contest).all())

        try:
            session.add(c1)
            session.add(c2)
            l = session.query(Contest).all()
            self.assertTrue(False)
        except AssertionError as e:
            raise e
        except Exception:
            pass

        session.rollback()

    def test_Contest_6 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # id, name, date, num_users, num_problems
        c1 = Contest(1,'b',0,1,2)
        c2 = Contest(1,'c',16,12,50)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Contest).all())

        try:
            session.add(c1)
            session.add(c2)
            l = session.query(Contest).all()
            self.assertTrue(False)
        except AssertionError as e:
            raise e
        except Exception:
            pass

        session.rollback()

    #--------
    # Problem
    #--------

    def test_Problem_1 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # contest_id, index, name, tags, points
        p = Problem(0, "D", "Bob", "special", 2.4)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Problem).all())

        session.add(p)

        self.assertEqual(len(session.query(Problem).all()),orig_length + 1)

        session.rollback()

    def test_Problem_2 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()
        # id, name, date, num_users, num_problems

        # contest_id, index, name, tags, points
        p1 = Problem(0, "D", "Bob", "special", 2.4)
        p2 = Problem(0, "F", "Mary's", "special", 2.7)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Problem).all())

        session.add(p1)
        session.add(p2)

        l = session.query(Problem).all()

        self.assertEqual(len(l),orig_length + 2)

        self.assertTrue(p1 in l)
        self.assertTrue(p2 in l)

        session.rollback()

    def test_Problem_3 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # contest_id, index, name, tags, points
        p1 = Problem(0, "D", "Bob", "special", 2.4)
        p2 = Problem(1, "D", "Sam", "unique", 0.2)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Problem).all())

        session.add(p1)
        session.add(p1)
        session.add(p2)
        session.add(p2)

        l = session.query(Problem).all()

        self.assertEqual(len(l),orig_length + 2)

        self.assertTrue(p1 in l)
        self.assertTrue(p2 in l)

        session.rollback()

    def test_Problem_4 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # contest_id, index, name, tags, points
        c = Problem(0, "D", "sample_name", "special", 2.4)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Problem).all())

        session.add(c)

        l = session.query(Problem).all()

        self.assertEqual(len(l),orig_length + 1)

        self.assertTrue(c in l)

        for contest in l :
            if contest is c:
                self.assertEqual("sample_name", contest.__repr__())


        session.rollback()

    def test_Problem_5 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # contest_id, index, name, tags, points
        p1 = Problem(0, "D", "Bob", "special", 2.4)
        p2 = Problem(0, "D", "Bob", "special", 2.4)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Problem).all())

        try:
            session.add(p1)
            session.add(p2)
            l = session.query(Problem).all()
            self.assertTrue(False)
        except AssertionError as e:
            raise e
        except Exception:
            pass

        session.rollback()

    def test_Problem_6 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        # contest_id, index, name, tags, points
        p1 = Problem(1, "C", "Bob", "special", 2.4)
        p2 = Problem(1, "C", "Hank", "weird", 0.2542)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(Problem).all())

        try:
            session.add(p1)
            session.add(p2)
            l = session.query(Problem).all()
            self.assertTrue(False)
        except AssertionError as e:
            raise e
        except Exception:
            pass

        session.rollback()


    # ------------
    # User to_dict
    # ------------

    def test_user_dict_1 (self) :
    # handle, name, rank, rating, registration_time
        u = User('a','b','c',1,2)

        self.assertTrue('handle' in u.to_dict())
        self.assertTrue(u.to_dict()['handle'] == 'a')

    def test_user_dict_2 (self) :
    # handle, name, rank, rating, registration_time
        u = User('a','b','c',1,2)

        self.assertTrue('handle' in u.to_dict())
        self.assertTrue('name' in u.to_dict())
        self.assertTrue('rank' in u.to_dict())
        self.assertTrue('rating' in u.to_dict())
        self.assertTrue('registration_time' in u.to_dict())

    def test_user_dict_3 (self) :
    # handle, name, rank, rating, registration_time
        u = User('a','b','c',1,2)

        self.assertTrue(u.to_dict()['handle'] == 'a')
        self.assertTrue(u.to_dict()['name'] == 'b')
        self.assertTrue(u.to_dict()['rank'] == 'c')
        self.assertTrue(u.to_dict()['rating'] == 1)
        self.assertTrue(u.to_dict()['registration_time'] == 2)

    # ------------
    # Contest to_dict
    # ------------

    # id, name, date, participants, problems
    def test_contest_dict_1 (self) :
    # id, name, date, participants, problems
        c = Contest(3,'b',4,1,2)

        self.assertTrue('id' in c.to_dict())
        self.assertTrue(c.to_dict()['id'] == 3)

    def test_contest_dict_2 (self) :
    # id, name, date, participants, problems
        c = Contest(3,'b',4,1,2)

        self.assertTrue('id' in c.to_dict())
        self.assertTrue('name' in c.to_dict())
        self.assertTrue('date' in c.to_dict())
        self.assertTrue('participants' in c.to_dict())
        self.assertTrue('problems' in c.to_dict())

    def test_contest_dict_3 (self) :
    # id, name, date, participants, problems
        c = Contest(3,'b',4,1,2)

        self.assertTrue(c.to_dict()['id'] == 3)
        self.assertTrue(c.to_dict()['name'] == 'b')
        self.assertTrue(c.to_dict()['date'] == 4)
        self.assertTrue(c.to_dict()['participants'] == 1)
        self.assertTrue(c.to_dict()['problems'] == 2)


    # ------------
    # Problem to_dict
    # ------------

    # id, name, index, contest_id, tags, points
    def test_problem_dict_1 (self) :
        # contest_id, index, name, tags, points
        p = Problem(240, "D", "Bob", str(['special', 'test']), 2.4)

        self.assertTrue('id' in p.to_dict())
        self.assertTrue(p.to_dict()['id'] == "240D")

    def test_problem_dict_2 (self) :
        p = Problem(0, "D", "Bob", str(['special']), 2.4)

        self.assertTrue('id' in p.to_dict())
        self.assertTrue('name' in p.to_dict())
        self.assertTrue('index' in p.to_dict())
        self.assertTrue('contest_id' in p.to_dict())
        self.assertTrue('tags' in p.to_dict())
        self.assertTrue('points' in p.to_dict())

    def test_problem_dict_3 (self) :
        p = Problem(0, "D", "Bob", str(['special']), 2.4)

        self.assertTrue(p.to_dict()['id'] == "0D")
        self.assertTrue(p.to_dict()['name'] == "Bob")
        self.assertTrue(p.to_dict()['index'] == "D")
        self.assertTrue(p.to_dict()['contest_id'] == 0)
        self.assertTrue(p.to_dict()['points'] == 2.4)

#
# ----
# main
# ----

if __name__ == "__main__" : # pragma: no cover
    app.config["SQLALCHEMY_DATABASE_URI"] = TEST_DATABASE_URI
    main()
