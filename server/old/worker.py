import os
import time
import redis
from rq import Worker, Queue, Connection

# import tasks

listen = ['default']

redis_url = 'redis://localhost:6379'

conn = redis.from_url(redis_url)

if __name__ == '__main__':
    with Connection(conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()