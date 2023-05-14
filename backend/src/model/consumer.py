from base import Node
import scipy
import random

res_default_params = {"loc": 19, "scale": 2}
com_default_params = {"loc": 16, "scale": 4}
ind_default_params = {"loc": 13, "scale": 6}
default_params = {"res": res_default_params, "com": com_default_params, "ind": ind_default_params}


class Consumer(Node):
    
    def __init__(self, id:int, loc:tuple, request_amount:float, sensitivity:float, behaviour_params:dict) -> None:
        super().__init__(id, loc)
        self.consumer_type = None
        self.behaviour_dist = None
        self.request_amount = request_amount
        self.sensitivity = sensitivity
        self.check_behaviour_params(behaviour_params)

    def __repr__(self) -> str:
        pass
    
    def check_behaviour_params(self, behaviour_params):
        # if behaviour_params is not empty, check that it contains the correct keys
        if behaviour_params:
            if "loc" not in behaviour_params.keys():
                behaviour_params["loc"] = default_params[self.consumer_type]["loc"]
            if "scale" not in behaviour_params.keys():
                behaviour_params["scale"] = default_params[self.consumer_type]["scale"]
        # if behaviour_params is not a dictionary, assign default values
        if not isinstance(behaviour_params, dict):
            behaviour_params = default_params[self.consumer_type]
        self.behaviour_params = behaviour_params

    def get_curr_request(self, time:float) -> float:
        """Return the consumption of the consumer at the given time"""
        pass
    

class ResidentialConsumer(Consumer):
    def __init__(self, id:int, loc:tuple, request_amount:float, sensitivity=None, behaviour_params=None) -> None:
        if sensitivity is None:
            sensitivity = 0.7
        self.behaviour_dist = scipy.stats.norm.pdf
        super().__init__(id, loc, sensitivity, request_amount, behaviour_params)
        self.consumer_type = "res"

    def __repr__(self) -> str:
        return f"Residential Consumer at location {self.location} (sensitivity: {self.sensitivity})"
    
    def get_curr_request(self, time:float) -> float:
        """Return the consumption of the consumer at the given time"""
        return self.behaviour_dist(time, **self.behaviour_params) * self.request_amount * random.uniform(0.8, 1.2)


class CommercialConsumer(Consumer):
    def __init__(self, id:int, loc:tuple, request_amount:float, sensitivity=None, behaviour_params=None) -> None:
        if sensitivity is None:
            sensitivity = 0.5
        self.behaviour_dist = scipy.stats.norm.pdf
        super().__init__(id, loc, sensitivity, request_amount, behaviour_params)
        self.consumer_type = "com"

    def __repr__(self) -> str:
        return f"Commercial Consumer at location {self.location} (sensitivity: {self.sensitivity})"
    
    def get_curr_request(self, time:float) -> float:
        """Return the consumption of the consumer at the given time"""
        return self.behaviour_dist(time, **self.behaviour_params) * self.request_amount * random.uniform(0.8, 1.2)


class IndustrialConsumer(Consumer):
    def __init__(self, id:int, loc:tuple, request_amount:float, sensitivity=None, behaviour_params=None) -> None:
        if sensitivity is None:
            sensitivity = 0.3
        self.behaviour_dist = scipy.stats.lognorm.pdf
        super().__init__(id, loc, sensitivity, request_amount, behaviour_params)
        self.consumer_type = "ind"

    def __repr__(self) -> str:
        return f"Industrial Consumer at location {self.location} (sensitivity: {self.sensitivity})"
    
    def get_curr_request(self, time:float) -> float:
        """Return the consumption of the consumer at the given time"""
        return self.behaviour_dist(time, 1, **self.behaviour_params) * self.request_amount * random.uniform(0.8, 1.2)

        

    