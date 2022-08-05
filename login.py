import pymongo
import sys


class Login:
    def __init__(self) -> None:
        self.user_Name = ''
        self.pass_Word = ''

        client = pymongo.MongoClient(
            "mongodb+srv://mahathi_mandapati:NGAKIPrkPdN7uQwW@cluster0.vc8oyr6.mongodb.net/?retryWrites=true&w=majority")
        db = client.APAD_Project
        self.col = db.Project
        self.col1 = db.User

    def encrypt(self):
        encryptedPwd = ""
        for i in self.pass_Word:
            position = int(ord(i) + 3)
            encryptedPwd += chr(position)
        return encryptedPwd

    def validate_login(self, data):
        self.pass_Word = data['password']
        print(data['password'])
        pwd = self.encrypt()
        print(pwd)
        document = self.col1.find_one({"username": data['username']})
        if document:
            print(document['password'])
            if (document['password'] == pwd):
                
                return 0
            return 2
        return 3

            


                            