from flask import Flask, redirect, render_template, send_from_directory, request
import json
import pymongo
from bson import ObjectId
from user import User
app = Flask(__name__, static_folder='build', static_url_path='/')


# Home page
@app.route('/Home', methods=['GET'])
def index():
    return 'This is the home page'


# sign up page
@app.route('/signup', methods=['POST'])
def signup():
    userInfo = request.get_json()
    print(userInfo)
    newuser = User()
    state = newuser.create_newuser(userInfo)
    return json.dumps({"state": state, "message": "Successfully create the account"})


        

# {'status': 1,"mes"}
if __name__ == "__main__":
    app.run()
