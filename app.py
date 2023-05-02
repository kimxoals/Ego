from flask import Flask
from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS  # comment this on deployment

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
# CORS(app)  # comment this on deployment
api = Api(app)

@app.route('/')
def hello():
    return '\u3145 \u3142 \20 \u3148 \uAC19 \uB2E4'



if __name__ == '__main__':
    app.run(debug=True)