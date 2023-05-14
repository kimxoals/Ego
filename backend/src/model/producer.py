from base import Node

class Producer(Node):
    def __init__(self, id:int, loc: tuple, capacity:float, producer_type:str) -> None:
        super().__init__(id, loc)
        if capacity is None:
            self.assign_capacity(producer_type)
        self.using = {}

    def assign_capacity(self, producer_type) -> None:
        if producer_type == "solar":
            self.capacity = 1_000
        elif producer_type == "wind":
            self.capacity = 2_000
        elif producer_type == "hydro":
            self.capacity = 5_000
        elif producer_type == "nuclear":
            self.capacity = 1_000_000
        elif producer_type == "coal":
            self.capacity = 500_000
        elif producer_type == "gas":
            self.capacity = 250_000
        else:
            raise ValueError("Producer type not supported")


    def send_energy(self, consumer_loc, amount:float) -> float:
        """Send energy to the consumer who requested energy"""
        # if the consumer is already using energy from this producer, remove it before adding the new amount
        if consumer_loc in self.using.keys(): 
            self.using.pop(consumer_loc)

        total_used = sum(self.using.values())
        can_send = min(self.capacity - total_used, amount)
        self.using[consumer_loc] = can_send
        if can_send < amount:
            print(f"Producer at {self.location} could not send {amount} to {consumer_loc}, only {can_send}")
        total_used += can_send
        print(f"Producer at {self.location} have {self.capacity - total_used} left")

    
    def get_curr_usage(self) -> float:
        return sum(self.using.values())

    def stop_send_energy(self, consumer_loc, amount):
        """Remove the amount of energy from the consumer"""
        if consumer_loc in self.using.keys():
            self.using.pop(consumer_loc)
            print(f"Consumer at {consumer_loc} is no longer using energy from producer at {self.location}")
        else:
            print(f"Consumer at {consumer_loc} is not using energy from producer at {self.location}")