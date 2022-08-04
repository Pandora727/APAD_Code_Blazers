import pymongo
import sys
class login:
     def __init__(self) -> None:
        self.user_Name = ''
        self.pass_Word = ''
        
        client = pymongo.MongoClient("mongodb+srv://mahathi_mandapati:NGAKIPrkPdN7uQwW@cluster0.vc8oyr6.mongodb.net/?retryWrites=true&w=majority")
        db = client.APAD_Project
        self.col = db.Project
        self.col1=db.User
    def validate_login(self):
        document = 
        {
            "user_Name":self.user_Name,
            "pass_Word":self.pass_Word,
            #Check if username and password are correct and in database
            #if both are correct, transfer to home page:
            #else, return 'Incorrect username or password'
        }
        self.col.insert_one(document)

                            
