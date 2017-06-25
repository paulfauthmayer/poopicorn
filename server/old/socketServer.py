from flask import Flask, render_template
from flask_socketio import SocketIO, emit

async_mode = None

app = Flask(__name__)

socketio = SocketIO(app, async_mode=async_mode)
thread = None


@app.route('/')
def index():
    # return render_template('test.html', async_mode=socketio.async_mode)
    return render_template('client.html', async_mode=socketio.async_mode)

@socketio.on('my event')
def test_message(message):
    print(message)
    print(1)
    emit('my response', {'data': 'got it!'})

@socketio.on_error_default
def default_error_handler(e):
    print(request.event["message"]) # "my error event"
    print(request.event["args"])    # (data,)

@socketio.on('connect', namespace='/test')
def test_connect():
    print('Connected!')
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, debug=True)