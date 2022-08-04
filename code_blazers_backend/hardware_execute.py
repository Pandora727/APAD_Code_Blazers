from hardware import hardware
import pymongo
import sys

h_object=hardware()
def get_hardware_data(hwname):
    print(hwname, file=sys.stderr)
    print("in the function", file=sys.stderr)
    return h_object.get_hardwareSets_data(hwname)

def checkIn_qty(qty, hwname, project_details):
    print("in hardware execute")
    h_object.set_hw_name(hwname)
    return h_object.check_in(qty, project_details[hwname])

def checkOut_qty(qty, hwname):
    print("in hardware execute checkout")
    h_object.set_hw_name(hwname)
    return h_object.check_out(qty)

def get_hw_availability(hwname):
    return h_object.get_availability_hwname(hwname)
