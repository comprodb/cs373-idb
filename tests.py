#!python


# from io       import StringIO
# from random   import randint
# import requests
from unittest import main, TestCase
from models import *
from sqlalchemy.orm import sessionmaker

# ------------
# TestComProDB
# ------------

class TestComProDB (TestCase) :

    def test_Problem_1 (self) :
        db.create_all()
        connection = db.engine.connect()
        trans = connection.begin()

        u = User('a','b','c',1,2)

        # configure Session class with desired options
        Session = sessionmaker(bind=db.engine)
        session = Session()

        orig_length = len(session.query(User).all())

        session.add(u)

        assert (len(session.query(User).all()) == orig_length + 1)

        session.rollback()




# ----
# main
# ----

if __name__ == "__main__" : # pragma: no cover
    main()