# Global AI Hackathon Amsterdam

A repository used to store ideas & code for the Global AI Hackathon in Amsterdam.  
_team theteambutbetter_


## Ideas

### Challenge 1 (Microsoft NWOW)

**Issue**: During the daily conversations slack feeds or mailchains sometimes are full unnecessary comments, GIFs, jokes or cat videos which destracts from work

**Idea**: Create a smart filter using MS graph API and Cognitive services for office emailing / instant messaging (Skype / Skype for business), which reduces automatically the "noise" from the conversations, filtering out the walkie-talkie parts focusing only the action points making work effective again! 🤓

---

**Issue**: Phishing is a number 1 threat for companies in terms of data security because of their unskilled employess or advanced phishing methodologies.

**Idea**: Create a smart blocking system which can analyze the incoming mails / messages, and separate malicious ones saving millions of unintentional data leak (and $).

Resources:
  * https://blog.barkly.com/phishing-statistics-2016

---

### Challenge 2 (Make News Great Again)
Resources:  
  * Clean data set with almost 13k classified websites: https://www.kaggle.com/mrisdal/fake-news
  * 244 categorized websites: https://github.com/bs-detector/bs-detector/blob/dev/ext/data/data.json
  * https://www.researchgate.net/profile/Victoria_Rubin/publication/281818865_Automatic_Deception_Detection_Methods_for_Finding_Fake_News/links/55f96b1608ae07629dea2f43/Automatic-Deception-Detection-Methods-for-Finding-Fake-News.pdf
  * https://github.com/aldengolab/fake-news-detection
  * http://www.fakenewschallenge.org/
  * https://chatbotslife.com/how-artificial-intelligence-can-combat-fake-news-e5bbd9d18453

Unclassified examples:  
  * Almost half a million references to news pages collected from an web aggregator in the period from 10-March-2014 to 10-August-2014: https://archive.ics.uci.edu/ml/datasets/News+Aggregator

_Note_: I asked Eduardo if we are going to get a training set, awaiting for response...  
---

**Issue:** Facebook/ Social Media in general is crawling with fake news/populistic articles/clickbait

**Idea:** Create a browser extension connected to a database + AI that marks every post with a percentage/score, indicating it's credibility.

---

**Issue:** People that would need fake news checks the most (people that frequent known fake news sites) are incredibly unlikely to use a tool that recognizes fake news

**Idea:** Make news sites responsible for what they post and fix this in law. If they are repeated offenders, start fining them. This has many issues however like censorship concerns, inclusion of (political) bias and difficult execution. Things that would have to be worked out for this to function:
  * flawless execution
    * the AI would have to be able to distinguish between fake news and not fake news (and slightly fake news) with great accuracy
    * bias is basically unavoidable but has to be minimzed
  * definition: what is fake news?
    * articles that think of something that fits their agenda?
    * articles that willingly and knowingly propel false facts they did not create themselves?
    * articles that are just incorrect without any ill meaning?
    * populistic articles in general
    * populistic articles that are technically correct but hold back a big chunk of the whole picture?
    * --> this has to be determined by an independent jury WITHOUT any influence of the government
  * how can you punish someone without infringing on his freedom of speech?
    * punishments only for repeated offenders
    * ... ? difficult decision

---

**Issue:** Fake news are highly subjective and not everyone has the same opinion on the line between fake news and proper news

**Idea:** In order to avoid any political bias, only show metrics for sites that you visit. I.e. how many other sites report about it, for pictures count the amount of pictures returned with a google reverse image search and using those metrics, predict the likelihood of it being fake or not. 




### Challenge 3 (Emotional AI)

**Issue**: Autists are generally struggling to realize and express human emotions

**Idea**: What if we create an emotional dictionary for autists and their parents to help the communication between them and ease their everyday life with a little online webapp with facial recognition

Resources:
  * http://news.stanford.edu/news/2012/august/autism-emotion-research-081312.html
  * http://theconversation.com/people-with-autism-dont-lack-emotions-but-often-have-difficulty-identifying-them-25225

---

**Issue**: Learning a foreign language is hard and the learning can be daunting sometimes, but if we find the enjoyment part all the effort we put in it just becomes fun.

**Idea**: Let's create a platform where people can learn useful phrases and the basics of the language based on their favorite songs / TV series simply by matching the url and a situation of the song on Youtube / Netflix. (Think about Italian or Latin soap operas, where you really don't know if they just talk or heavily arguing about something!)

Extension to the original idea: a slang dictionary --> in most of the TV shows they use really local slang phrases so what if we create a plaform where you can automatically find the real meaning of the sentence in plain english

Extra: Spotify songs can be integrated too, where basically you don't even see the face of the singer and not every song has a music video by default

---

**Issue**: One of the main reasons people are living their company (besid money) is that they feel burnout, or stucked at the position they currently have, which is especially true for the millenials.

**Idea**: What if we create an emotional blog for employees where they can record their daily good & bad happenings by voice recording and the platform would automatically do a sentiment analysis detecting the tone and the mood during the day. In case of longer term thinking this might be a tool for the employer also to monitor anonimously the situation of the company, which area they should change or motivate people more with something else.

---

**Issue**: The YouTube is full of best of moments of movies and TV shows in different languages to show the best parts for the wider audience without watching the full movie

**Idea**: Let's create a searchable video library which can scan YouTube and Netflix videos by a simple search term, so it's easy to get to the "best part" anytime without clicking around the whole timeline

---

**Issue**: There are literally thousand of websites and blogs around searching for what people are wearing in movies, music videos and TV shoes.

**Idea**: What if we create a live recognition system where you can put in a url of the video you want to analyze and our platform automatically recognizing some objects of the video and offer you to buy it based on a Google search the system made
