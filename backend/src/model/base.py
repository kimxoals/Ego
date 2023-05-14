class Node:
    
    def __init__(self, id:int, loc:tuple) -> None:
        self.check_location(loc)
        self.location = loc
        self.id = id

    @staticmethod
    def check_location(loc):
        # if location is not an integer tuple of size 2, raise an error
        if not isinstance(loc, tuple) or len(loc) != 2:
            raise ValueError("Location must be a tuple of size 2")
        if not isinstance(loc[0], int) or not isinstance(loc[1], int):
            raise ValueError("Location must be a tuple of integers")
        
    def __eq__(self, other):
        return self.id == other.id
        
    def get_distance(self, other):
        """Return the distance between this node and another node"""
        return ((self.location[0] - other.location[0])**2 + (self.location[1] - other.location[1])**2)**0.5
    
    def change_location(self, new_loc):
        """Change the location of the node"""
        self.check_location(new_loc)
        self.location = new_loc


class Edge:
    def __init__(self, source:Node, target:Node) -> None:
        if not isinstance(source, Node) or not isinstance(target, Node):
            raise ValueError("Source and target must be nodes")
        self.source = source
        self.source = target

    def __repr__(self) -> str:
        return f"Edge from {self.source} to {self.target}"
    
    def get_edge_info(self) -> tuple:
        return (self.source.location, self.target.location)
    
    def __eq__(self, other):
        return self.source == other.source and self.target == other.target