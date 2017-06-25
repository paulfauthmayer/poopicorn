import time
import newspaper

# from datetime import datetime

# model = datetime.now().time().strftime('%H:%M:%S')

def get_content(url):
   a = Article(url, language='en')
   a.download()
   a.parse()
   return u''.join(a.text).encode('utf-8').strip()

def check_url(url, model):

	# Commented for now TODO do something here
	# content = get_content(url)
	content = url

	time.sleep(10)

	return model.predict() # Dummy return val until connection to model is established