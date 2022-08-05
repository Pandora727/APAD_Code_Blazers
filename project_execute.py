import pymongo
from Projects import Projects


p_object = Projects()
def create_new_project(data):
    p_object.set_project_id(data['project_id'])
    p_object.set_project_name(data['project_name'])
    p_object.set_project_description(data['project_desc'])
    p_object.set_owner(data['owner'])
    
    state = check_project_availability(p_object, data['username'])
    if state == 0:
        p_object.create_project()
    return state
   

def check_project_availability(p_object, username):
    if p_object.check_project_id(username) == 1:
        return 1
    elif p_object.check_project_name() == 1:
        return 2
    else :
        return 0

def get_project_info(project_id):
    p_object.set_project_id(project_id)
    return p_object.get_info()

def update_checkin_checkout(project_id, hwname, qty, flag):
    p_object.set_project_id(project_id)
    if flag == 0:
        return p_object.update_resources(hwname, qty)
    else:
        return p_object.update_resources(hwname, qty*-1)

    


        
def project_access(data):
    p_object.set_project_id(data['project_id'])
    return p_object.check_project_id(data['username'])



