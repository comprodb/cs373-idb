from flask import Blueprint, jsonify, request
from subprocess import Popen, PIPE

test = Blueprint('test', __name__)

@test.route('/')
def root():
    # get parameters)
    p = Popen('make test', shell=True, stderr=PIPE, stdout=PIPE)
    stderr = p.stderr
    stdout = p.stdout

    p.wait()

    data = stderr.read().decode() + stdout.read().decode()

    return jsonify(data=data)
