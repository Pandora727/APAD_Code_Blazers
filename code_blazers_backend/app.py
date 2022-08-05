from tracemalloc import start
from flask import Flask, request,send_from_directory
from project_execute import project_access, create_new_project, get_project_info, update_checkin_checkout
from hardware import hardware
from hardware_execute import get_hardware_data,checkIn_qty,checkOut_qty,get_hw_availability
from login import Login 
from bson import ObjectId
from user import User
import json
import sys
import time



app=Flask(__name__, static_folder='../build',static_url_path='/')
@app.route('/verify_projectid',methods=['POST', 'GET'])
def verify_projectid():
    data = request.get_json()
    start_time = time.time()
    print(data['username'], file=sys.stderr)
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

@app.route('/get_hw_data', methods=['GET', 'POST'])
def get_hw_data_api():
    data = request.get_json()
    HWdata = get_hardware_data(data['hw_name'])
    try:   
        project_details = get_project_info(data['project_id'])
        HWdata.pop('_id')
        print("returning from try block")
        print("project_details:", project_details)
        print()
        return json.dumps({'hwdata': HWdata, 'project_data': project_details})
    except Exception as e:
        HWdata.pop('_id')
        return json.dumps(HWdata)




@app.route('/check_in', methods=['GET','POST'])
def check_in():
    print("in check in")
    data = request.get_json()
    res = checkIn_qty(data['qty'], data['hw_name'], data['project_details'])
    HWData= get_hardware_data(data['hw_name'])
    HWData.pop('_id')
    if res == 0:
        project_details = update_checkin_checkout(data['project_details']['project_id'],  data['hw_name'], data['qty'], 1)
        return json.dumps({"state":res,"hwdata":HWData, "project_details": project_details})
    else:
        return json.dumps({"state":res,"hwdata":HWData})



@app.route('/check_out', methods=['GET','POST'])
def check_out():
    print("in check out", file=sys.stderr)
    data = request.get_json()
    qty, res = checkOut_qty(data['qty'], data['hw_name'])
    print(qty, res, file=sys.stderr)
    HWData = get_hardware_data(data['hw_name'])
    HWData.pop('_id')
    project_details = update_checkin_checkout(data['project_details']['project_id'],  data['hw_name'], qty, 0)
    print(project_details, file=sys.stderr)
    return json.dumps({"state":res,"hwdata":HWData, "project_details": project_details})


@app.route('/')
def index():
    return app.send_static_file('index.html')


# sign up page
@app.route('/signup', methods=['POST'])
def signup():
    userInfo = request.get_json()
    print(userInfo)
    newuser=User()
    state = newuser.create_newuser(userInfo)
    return json.dumps({"state": state, "message": "Successfully create the account"})


#Login page
@app.route('/loginrequest', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        userlogin = Login()
        state = userlogin.validate_login(data)
        return json.dumps({'state':state})

 




