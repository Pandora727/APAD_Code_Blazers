import pymongo
class hardware:
    def __init__(self) -> None:
        self.capacity=''
        self.availability=''
        self.hw_name=''
        client = pymongo.MongoClient("mongodb+srv://mahathi_mandapati:NGAKIPrkPdN7uQwW@cluster0.vc8oyr6.mongodb.net/?retryWrites=true&w=majority")
        db = client.APAD_Project
        self.col = db.Project
        self.col1=db.User
        self.col2=db.Hardware
    def get_availability(self):
        return self.availability
  
    def set_availability(self,availability):
        self.availability=availability
    
    def get_capacity(self):
        return self.capacity

    def get_hw_name(self):
        return self.hw_name
    
    def set_hw_name(self,hw_name):
        self.hw_name=hw_name

    def set_capacity(self, capacity: int):
        self.capacity = capacity

    def get_availability_hwname(self):
        myquery = { "hw_name" : self.hw_name }
        data=self.col2.find_one(myquery)
        self.set_availability(data['availability'])
        return self.availability

    def get_capacity_hwname(self):
        myquery = { "hw_name" : self.hw_name }
        data=self.col2.find_one(myquery)
        self.set_capacity(data['capacity'])
        return self.capacity

    def get_hardwareSets_data(self,hwname):
        x = self.col2.find_one({"hw_name":hwname})
        return x
    def check_in(self, qty : int, checkedout_qty: int):
        print("in hrdware")
        self.get_availability_hwname()
        self.get_capacity_hwname()
        if(qty > checkedout_qty):
            # self.set_availability(self.get_capacity_hwname())
            # self.col2.update_one({ "hw_name" : self.hw_name },
            # {
            #     '$set': {
            #         'availability': self.get_availability()
            #     }

            # })
            return 1
        else:
            self.availability += qty
            self.set_availability(self.availability)
            self.col2.update_one({ "hw_name" : self.hw_name },
            {
                '$set': {
                    'availability': self.get_availability()
                }

            })
            print("check in sucess")
            
            return 0

    def check_out(self,qty :int ):
        self.get_availability_hwname()
        if(self.availability - qty < 0):
            checked_out =  self.get_availability()
            print("no enough avalability")
            self.set_availability(0)
            self.col2.update_one({ "hw_name" : self.hw_name },
            {
                '$set': {
                    'availability': self.get_availability()
                }

            })
            return checked_out, 1 
        else:
            self.availability-=qty
            self.set_availability(self.availability)
            self.col2.update_one({ "hw_name" : self.hw_name },
            {
                '$set': {
                    'availability': self.get_availability()
                }
         })
            print("successs")
            return qty, 0