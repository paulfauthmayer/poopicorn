
from flask import Flask, render_template
from flask_sockets import Sockets
from sys import stdout

from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler

import redis
from rq import Worker, Queue, Connection

app = Flask(__name__)
sockets = Sockets(app)


@sockets.route('/echo')
def echo_socket(ws):
    while not ws.closed:
        message = ws.receive()
        if message is not None:
            print(message)
            ws.send(message)


@app.route('/')
def index():
    return 'Hello World!'


if __name__ == "__main__":
    pywsgi.WSGIServer(('', 5000), app, log=stdout, handler_class=WebSocketHandler).serve_forever()
