from flask import Flask, request,send_from_directory
from project_execute import project_access, create_new_project, get_project_info, update_checkin_checkout
from hardware import hardware
from hardware_execute import get_hardware_data,checkIn_qty,checkOut_qty,get_hw_availability
from login import Login 
from bson import ObjectId
from user import User
from flask_cors import CORS, cross_origin
import json
import sys
import time



app=Flask(__name__, static_folder='build',static_url_path='/')
CORS(app)
@app.route('/verify_projectid',methods=['POST', 'GET'])
@cross_origin()
def verify_projectid():
    data = request.get_json()
    print(data['username'], file=sys.stderr)
    flag = project_access(data)
    if flag:
        print("entered project id:", data['project_id'])
        return json.dumps({'flag': True})
    else:
        return json.dumps({'flag':False})
    

@app.route('/create_projectid', methods=['POST', 'GET'])
@cross_origin()
def project_create():
    print("inside the function",  file=sys.stderr)
    data = request.get_json()
    state = create_new_project(data)
    return json.dumps({'state':state})

@app.route('/get_hw_data', methods=['GET', 'POST'])
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/loginrequest', methods=['GET'])
@cross_origin()
def loginrequestpage():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/signup', methods=['GET'])
@cross_origin()
def signuppage():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/projects', methods=['GET'])
@cross_origin()
def projectspage():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/projects/create_new_project', methods=['GET'])
@cross_origin()
def createprojectspage():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/projects/hardware_management_page', methods=['GET'])
@cross_origin()
def hardwarepage():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/home/', methods=['GET'])
@cross_origin()
def homepage():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/redirect', methods=['GET'])
@cross_origin()
def redirectpage():
    return send_from_directory(app.static_folder, 'index.html')





# sign up page
@app.route('/signup', methods=['POST'])
@cross_origin()
def signup():
    userInfo = request.get_json()
    print(userInfo)
    newuser=User()
    state = newuser.create_newuser(userInfo)
    return json.dumps({"state": state, "message": "Successfully create the account"})


#Login page
@app.route('/loginrequest', methods=['POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        data = request.get_json()
        userlogin = Login()
        state = userlogin.validate_login(data)
        return json.dumps({'state':state})

 




