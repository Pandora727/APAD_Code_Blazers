import pymongo
class Projects:
    def __init__(self) -> None:
        self.project_id = ''
        self.project_name = ''
        self.project_description = ''
        self.owner = ''
        client = pymongo.MongoClient("mongodb+srv://mahathi_mandapati:NGAKIPrkPdN7uQwW@cluster0.vc8oyr6.mongodb.net/?retryWrites=true&w=majority")
        db = client.APAD_Project
        self.col = db.Project
        self.col1=db.User
    def get_project_id(self):
        return self.project_id
    def set_project_id(self,project_id):
        self.project_id=project_id
    def get_project_name(self):
        return self.project_name
    def set_project_name(self, project_name):
        self.project_name=project_name
    def get_project_description(self):
        return self.project_description
    def set_project_description(self, project_description):
        self.project_description=project_description
    def get_owner(self):
        return self.owner
    def set_owner(self,owner):
        self.owner=owner
    def check_project_id(self, username):
        myquery = { "project_id" : self.project_id }
        if (self.col.count_documents(myquery)) <1:
            return 0
        else:
            self.update_user_project_access(username)
            return 1
    def check_project_name(self):
        myquery = {"project_name" : self.project_name }
        if (self.col.count_documents(myquery)) < 1:
            return 0
        else:
            return 1
    def create_project(self):
        document = {
            "project_id":self.project_id,
            "project_name":self.project_name,
            "project_description":self.project_description,
            "owner": self.owner,
            "hwset_1": 0,
            "hwset_2": 0
        }
        self.col.insert_one(document)
        self.update_user_project_access(self.owner)
    def get_info(self):
        data = self.col.find_one({'project_id': self.project_id})
        data.pop('_id')
        return  data 
    
    def update_resources(self, hwname, qty):
        self.col.update_one({'project_id': self.project_id},
                            {'$inc': {hwname: qty}}
                            )
        return self.get_info()
        
    def update_user_project_access(self, username):
        self.col1.update_one({'username': username},
                            {'$addToSet': {'projects_access': self.project_id}}
                            )

if __name__=="__main__":
    pass
