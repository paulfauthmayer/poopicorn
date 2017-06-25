import os
import time
import redis
from rq import Worker, Queue, Connection

listen = ['default']

redis_url = 'redis://localhost'
redis_port = '6379'

conn = redis.from_url('{}:{}'.format(redis_url, redis_port))

if __name__ == '__main__':
    with Connection(conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()