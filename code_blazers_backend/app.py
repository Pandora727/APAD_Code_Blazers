from flask import Flask, request,send_from_directory
import json
import sys
import time
from Hardware import hardware
from Hardware_execute import get_hardware_data,checkIn_qty,checkOut_qty,get_hw_availability
app=Flask(__name__,static_folder='../code_blazers/build',static_url_path='/')

@app.route('/api/getter',methods=['GET'])
def getter_api():
    print("Hii")
    return json.dumps({'data_from_backend':20})
@app.route('/',methods=['GET'])
def index():
    return json.dumps({'data_from_backend':20})
@app.route('/get_hw_data', methods=['GET', 'POST'])
def get_hw_data_api():
    data = request.get_json()
    HWdata = get_hardware_data(data['hw_name'])
    HWdata.pop('_id')
    return json.dumps(HWdata)

@app.route('/check_in', methods=['GET','POST'])
def check_in():
    print("in check in")
    data = request.get_json()
    res = checkIn_qty(data['qty'],data['hw_name'])
    HWData= get_hardware_data(data['hw_name'])
    HWData.pop('_id')
    return json.dumps({"state":res,"hwdata":HWData})


@app.route('/check_out', methods=['GET','POST'])
def check_out():
    print("in check out", file=sys.stderr)
    data = request.get_json()
    res = checkOut_qty(data['qty'],data['hw_name'])
    HWData= get_hardware_data(data['hw_name'])
    HWData.pop('_id')
    return json.dumps({"state":res,"hwdata":HWData})


