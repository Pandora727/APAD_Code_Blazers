import pymongo
import sys


class User:
    def __init__(self):
        self.username = ''
        self.pwd = ''
        self.securityQ = ''
        self.securityA = ''
        self.projects = []
        client = pymongo.MongoClient(
            "mongodb+srv://mahathi_mandapati:NGAKIPrkPdN7uQwW@cluster0.vc8oyr6.mongodb.net/?retryWrites=true&w=majority")
        db = client.APAD_Project
        self.col = db.Project
        self.col1 = db.User

    def user_login(self):
        pass

    def check_existed_user(self):
        if self.col1.count_documents({'username': self.username}) != 0:

            return 1
        else:
            return 0

    def encrypt(self):
        encryptedPwd = ""
        for i in self.pwd:
            position = int(ord(i) + 3)
            encryptedPwd += chr(position)
        return encryptedPwd

    def create_newuser(self, data):
        self.username = data['username']
        self.pwd = data['password']
        self.securityQ = data['security_question']
        self.securityA = data['security_answer']
        print("inside check user",self.check_existed_user())
        if self.check_existed_user() == 1:
            
            return 1
        else:
            self.col1.insert_one({
                'username': self.username,
                'password': self.encrypt(),
                'security_question': self.securityQ,
                'security_answer': self.securityA,
                'projects_access': []
            })
            return 0
