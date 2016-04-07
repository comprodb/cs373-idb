from flask import Blueprint, jsonify, request
from subprocess import Popen, PIPE

test = Blueprint('test', __name__)

@test.route('/')
def root():
    # get parameters)
    p = Popen('python ./tests.py', shell=True, stderr=PIPE)
    stdout = p.stderr

    p.wait()

    data = stdout.read().decode()

    return jsonify(data=data)
