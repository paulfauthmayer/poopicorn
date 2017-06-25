import time
import newspaper

def get_content(url):
   a = Article(url, language='en')
   a.download()
   a.parse()
   return u''.join(a.text).encode('utf-8').strip()

def check_url(url):

	# Commented for now TODO do something here
	# content = get_content(url)
	content = url

	time.sleep(10)

	return len(content) # Dummy return val until connection to model is established