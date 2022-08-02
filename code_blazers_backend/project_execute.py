import pymongo
from Projects import projects

def create_new_project(data):
    p_object = projects()
    p_object.set_project_id(data['project_id'])
    p_object.set_project_name(data['project_name'])
    p_object.set_project_description(data['project_desc'])
    
    state = check_project_availability(p_object)
    if state == 0:
        p_object.create_project()
    return state
   

def check_project_availability(p_object):
    if p_object.check_project_id() == 1:
        return 1
    elif p_object.check_project_name() == 1:
        return 2
    else :
        return 0
        
def project_access(data):
    p_object = projects()
    p_object.set_project_id(data['project_id'])
    return p_object.check_project_id()



