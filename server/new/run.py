import redis
import tasks
import jsonify

from flask import Flask, request, json
from flask_sockets import Sockets

from rq import Queue
from rq.job import Job
from worker import conn

from sys import stdout
from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler

app = Flask(__name__)
sockets = Sockets(app)

redis_conn = redis.StrictRedis(host='localhost', port=6379, db=0)
q = Queue(connection=redis_conn)


@app.route("/")
def index():
    return "Hello World!"


@sockets.route('/check')
def check(ws):
    while not ws.closed:
        message = ws.receive()
        if message is not None:
            js = (json.loads(message))

            url = js['url']
            job = q.enqueue_call(func=tasks.check_url, args=(url,), result_ttl=5000)
            ws.send(job.get_id())


@sockets.route('/result')
def check(ws):
    while not ws.closed:
        message = ws.receive()
        if message is not None:
            js = (json.loads(message))

            job_key = js['job_key']

            job = Job.fetch(job_key, connection=conn)

            if job.is_finished:
                 ws.send(jsonify str(job.result))
            else:
                return "Not finished", 202


if __name__ == "__main__":
    pywsgi.WSGIServer(('', 5000), app, log=stdout, handler_class=WebSocketHandler).serve_forever()
    # app.run()