from consumer import *
from producer import Producer
from powerline import Powerline
from base import *

class Powergrid:
    def __init__(self, area):
        try:
            self.x_min = area[0][0]
            self.x_max = area[0][1]
            self.y_min = area[1][0]
            self.y_max = area[1][1]
        except:
            raise ValueError("Area must be a tuple of tuples size of 2x2")
        self.consumers = set()
        self.producers = set()
        self.edges = set()

    def add_node(self, node):
        if not isinstance(node, Node):
            raise ValueError("Node must be a node")
        for n in (self.consumers | self.producers):
            if n == node:
                print("Node already exists")
                return
        if isinstance(node, Consumer):
            self.consumers.add(node)
        elif isinstance(node, Producer):
            self.producers.add(node)

    def add_edge(self, edge):
        if not isinstance(edge, Edge):
            raise ValueError("Edge must be an edge")
        for e in self.edges:
            if e == edge:
                print("Edge already exists")
                return
        self.edges.add(edge)

    def get_total_capacity(self):
        """Return the total capacity of the producers in the powergrid"""
        total_capacity = 0
        for node in self.producers:
            total_capacity += node.capacity
        return total_capacity
    
    def get_toal_usage(self):
        """Return the total usage of the consumers in the powergrid"""
        total_usage = 0
        for node in self.producers:
            total_usage += node.get_curr_usage()
        return total_usage
    
    def get_curr_percentage(self):
        """Return the current percentage of usage"""
        return self.get_toal_usage() / self.get_total_capacity()
