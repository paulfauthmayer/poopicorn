from flask import Flask, Blueprint
from flask_sockets import Sockets


html = Blueprint(r'html', __name__)
ws = Blueprint(r'ws', __name__)


@html.route('/')
def hello():
    return 'Hello World!'

@ws.route('/echo')
def echo_socket(socket):
    while not socket.closed:
        message = socket.receive()
        socket.send(message)


app = Flask(__name__)
sockets = Sockets(app)

app.register_blueprint(html, url_prefix=r'/')
sockets.register_blueprint(ws, url_prefix=r'/')


if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    server = pywsgi.WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
    server.serve_forever()