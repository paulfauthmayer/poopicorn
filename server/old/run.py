from flask import Flask, request, json


from rq import Queue
from rq.job import Job
from worker import conn

import redis
# from models import Result

import time

import tasks

app = Flask(__name__)

redis_conn = redis.StrictRedis(host='localhost', port=6379, db=0)
q = Queue(connection=redis_conn)

@app.route("/")
def hello():
    return "Hello World!"


@app.route('/result/<job_key>', methods=['GET'])
def result(job_key):
    
    job = Job.fetch(job_key, connection=conn)

    if job.is_finished:
        return str(job.result), 200
    else:
        return "Not finished", 202

@app.route('/check', methods=['POST'])
def index():
    
    if request.headers['Content-Type'] == 'application/json':
        js = (json.loads(request.data))

        url = js['url']
        job = q.enqueue_call(
            func=tasks.dis_job, args=(url,), result_ttl=5000
        )
    
    return job.get_id()


if __name__ == "__main__":
    app.run()