from tracemalloc import start
from flask import Flask, request,send_from_directory
from project_execute import project_access, create_new_project
from Projects import projects
import json
import sys
import time



app=Flask(__name__, static_folder='build',static_url_path='/')
@app.route('/verify_projectid',methods=['POST', 'GET'])
def verify_projectid():
    data = request.get_json()
    start_time = time.time()
    flag = project_access(data)
    print("run_time:", time.time() - start_time, file=sys.stderr)
    if flag:
        print("entered project id:", data['project_id'])
        return json.dumps({'flag': True})
    else:
        return json.dumps({'flag':False})
    

@app.route('/create_projectid', methods=['POST', 'GET'])
def project_create():
    print("inside the function",  file=sys.stderr)
    data = request.get_json()
    state = create_new_project(data)
    return json.dumps({'state':state})

@app.route('/')
def index():
    return send_from_directory(app.static_folder,'index.html')