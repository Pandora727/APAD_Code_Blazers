from flask import Flask, redirect, render_template, send_from_directory, request
import json
import pymongo
import time
import sys
from login import login
from bson import ObjectId
app = Flask(__name__, static_folder='build', static_url_path='/')

client = pymongo.MongoClient("mongodb+srv://zf2638:xxdwn2Ixq4Sl1QWs@cluster0.flvr9ey.mongodb.net/?retryWrites=true&w=majority")
db = client.Accounts

#Home page
@app.route('/Home', methods=['GET'])
def index():
    return 'This is the home page'

#Sign up page
@app.route('/signup', methods=['POST'])
def signup():
    if request.methods == 'POST':
        userInfo = request.json()
        if db.Accounts.find_one({'email': userInfo['email']}):
            
            return 'User already existed'
        else:
            db.Accounts.insert_one({
                'username': userInfo['username'],
                'email': userInfo['email'],
                'password': userInfo['password'],
                'securityQ': userInfo['securityQ'],
                'securityA': userInfo['securityA']
            })
            return 'Account successfully created'
            
#Login page
@app.route('/loginrequest', methods=['POST'])
def login():
    if request.methods == 'POST':
        data = request.get_json()
        state = validate_login(data)
        return json.dumps({'state':state})

if __name__ == "__main__":
    app.run()