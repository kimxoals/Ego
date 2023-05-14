from backend.src.model.base import Node
from base import Edge
from consumer import Consumer
from producer import Producer

class Powerline(Edge):
    def __init__(self, source: Node, target: Node) -> None:
        super().__init__(source, target)

    def get_type(self):
        if isinstance(self.target, Consumer):
            if isinstance(self.source, Consumer):
                return "c2c"
            elif isinstance(self.source, Producer):
                return "p2c"
