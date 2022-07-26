from flask import Flask,send_from_directory
import json
app=Flask(__name__,static_folder='../code_blazers/build',static_url_path='/')
app=Flask(__name__)
@app.route('/api/getter',methods=['GET'])
def getter_api():
    print("Hii")
    return json.dumps({'data_from_backend':20})
@app.route('/',methods=['GET'])
def index():
    return json.dumps({'data_from_backend':20})