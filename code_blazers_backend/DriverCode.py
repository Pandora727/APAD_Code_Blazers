import pymongo
from Hardware import hardware
from Projects import projects

def operation(op,qty):
    if op == '1':
        x = H_object.check_in(qty)
    else:
        x = H_object.check_out(qty)
    return x


# def create_new_project():
#     if check_project_availability() == 0:
#         p_object.create_project()
#     elif check_project_availability() == 1:
#         print("project_id exists")
#     else:
#         print("project_name exists")


# def check_project_availability():
#     if p_object.check_project_id() == 1:
#         print(1)
#         return 1
#     elif p_object.check_project_name() == 1:
#         print(2)
#         return 2
#     else :
#         print(3)
#         return 0



if __name__=="__main__":
    # id = input("enter project_id:")
    # name = input("enter project name:")
    # desc = input("enter project description:")
    # owner = input("enter the owner:")
    # p_object = projects()
    # p_object.set_project_id(id)
    # p_object.set_project_name(name)
    # p_object.set_project_description(desc)
    # p_object.set_owner(owner)
    # # create_new_project()
    # p_object.update_user_project_access()
    hwset_name=input("enter hardware set name:")
    qty=input("enter qty to check in or checkout:")
    qty=int(qty)
    op=input("enter 1 if checkin enter 0 if check out:")
    project_id_for_hw:input("enter the project_id:")

    H_object=hardware()
    H_object.set_hw_name(hwset_name)
    H_object.get_hardwareSets_data(hwset_name)
    operation(op,qty)



            

