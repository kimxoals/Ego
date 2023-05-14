from model.consumer import *

@abs
class ConsumerFactory:
    """Factory for creating consumers"""

    consumer_types = ["res", "com", "ind"]
    
    def create_consumer(self, consumer_type, id:int, loc:tuple, request_amount:float, sensitivity=None, behaviour_dist=None, behaviour_params=None) -> Consumer:
        """Create a consumer of the given type at the given location"""
        if consumer_type not in self.consumer_types:
            raise ValueError(f"Consumer type {consumer_type} not supported")
        
        if consumer_type == "res":
            return ResidentialConsumer(id, loc, request_amount, sensitivity, behaviour_dist, behaviour_params)
        elif consumer_type == "com":
            return CommercialConsumer(id, loc, request_amount, sensitivity, behaviour_dist, behaviour_params)
        elif consumer_type == "ind":
            return IndustrialConsumer(id, loc, request_amount, sensitivity, behaviour_dist, behaviour_params)
        
    
    def get_consumer_types(self) -> list:
        """Return a list of available consumer types"""
        print(f"Available consumer types: {self.consumer_types}")
        return self.consumer_types