import os
import time
import redis
import configparser

from rq import Worker, Queue, Connection

current_dir = os.path.dirname(__file__)
config_dir = os.path.join(current_dir, 'app.conf')
config = configparser.ConfigParser()
config.read(config_dir)

listen = ['default'] # Leave it at default

redis_url = config.get('ai', 'redis-url')
redis_port = config.get('ai', 'redis-port')

conn = redis.from_url('{}:{}'.format(redis_url, redis_port))

if __name__ == '__main__':
    with Connection(conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()