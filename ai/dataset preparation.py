
# coding: utf-8

# In[1]:

#%load_ext autoreload
#%reload_ext autoreload
import pandas as pd
import numpy as np
import glove
from sklearn.model_selection import train_test_split, ShuffleSplit, StratifiedShuffleSplit


# In[2]:

df = pd.read_csv("./data/fake.csv")
cols = ["title", "text", "site_url", "type"] #main_img_url
df = df[cols]
df = df.replace({r'\r\n': '', r'\n': ''}, regex=True)
df["type"] = 1


# In[3]:

df_ = pd.read_csv("./data/negative_examples.csv")
df_['site_url'] = df_['site_url'].apply(lambda x: str(x).lstrip("www."))
data = pd.concat([df, df_], axis=0)


# Divide data into train and test sets

# In[4]:

y = data["type"]
rs = ShuffleSplit(n_splits=3, random_state=0, test_size=0.20)
train = data.loc[next(rs.split(data, y))[0], :]
test = data.loc[next(rs.split(data, y))[1], :]


# In[5]:

train = train.dropna(axis=0)
test = test.dropna(axis=0)


# In[40]:

#np.mean([len(i.split()) for i in train[train['type'] == 0]['text'].values])


# In[41]:

#np.mean([len(i.split()) for i in train[train['type'] == 1]['text'].values])


# In[47]:

test.to_csv("./data/test.csv", index=True)
train.to_csv("./data/train.csv", index=True)


# In[14]:

#X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=2018)


# In[6]:

'''
Single model may achieve LB scores at around 0.29+ ~ 0.30+
Average ensembles can easily get 0.28+ or less
Don't need to be an expert of feature engineering
All you need is a GPU!!!!!!!

The code is tested on Keras 2.0.0 using Tensorflow backend, and Python 2.7

According to experiments by kagglers, Theano backend with GPU may give bad LB scores while
        the val_loss seems to be fine, so try Tensorflow backend first please
'''

########################################
## import packages
########################################
import os
import re
import csv
import codecs
import numpy as np
import pandas as pd

from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from string import punctuation

from gensim.models import KeyedVectors
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.layers import Dense, Input, LSTM, Embedding, Dropout, Activation
from keras.layers.merge import concatenate
from keras.models import Model
from keras.layers.normalization import BatchNormalization
from keras.callbacks import EarlyStopping, ModelCheckpoint

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

########################################
## set directories and parameters
########################################
BASE_DIR = './data/'
EMBEDDING_FILE = BASE_DIR + 'GoogleNews-vectors-negative300.bin'
EMBEDDING_FILE = '/dev/GoogleNews-vectors-negative300.bin'

TRAIN_DATA_FILE = BASE_DIR + 'train.csv'
TEST_DATA_FILE = BASE_DIR + 'test.csv'
MAX_SEQUENCE_LENGTH = 500
MAX_NB_WORDS = 200000
EMBEDDING_DIM = 300
VALIDATION_SPLIT = 0.1

num_lstm = np.random.randint(175, 275)
num_dense = np.random.randint(100, 150)
rate_drop_lstm = 0.15 + np.random.rand() * 0.25
rate_drop_dense = 0.15 + np.random.rand() * 0.25

act = 'relu'
re_weight = True # whether to re-weight classes to fit the 17.5% share in test set

STAMP = 'lstm_%d_%d_%.2f_%.2f'%(num_lstm, num_dense, rate_drop_lstm,         rate_drop_dense)


csv.field_size_limit(sys.maxsize)

########################################
## index word vectors
########################################
print('Indexing word vectors')

word2vec = KeyedVectors.load_word2vec_format(EMBEDDING_FILE,         binary=True)
print('Found %s word vectors of word2vec' % len(word2vec.vocab))

########################################
## process texts in datasets
########################################
print('Processing text dataset')


# In[33]:

# The function "text_to_wordlist" is from
# https://www.kaggle.com/currie32/quora-question-pairs/the-importance-of-cleaning-text
def text_to_wordlist(text, remove_stopwords=False, stem_words=False):
    # Clean the text, with the option to remove stopwords and to stem words.
    
    # Convert words to lower case and split them
    text = text.lower().split()

    # Optionally, remove stop words
    if remove_stopwords:
        stops = set(stopwords.words("english"))
        text = [w for w in text if not w in stops]
    
    text = " ".join(text)

    # Clean the text
    text = re.sub(r"[^A-Za-z0-9^,!.\/'+-=]", " ", text)
    text = re.sub(r"what's", "what is ", text)
    text = re.sub(r"\'s", " ", text)
    text = re.sub(r"\'ve", " have ", text)
    text = re.sub(r"can't", "cannot ", text)
    text = re.sub(r"n't", " not ", text)
    text = re.sub(r"i'm", "i am ", text)
    text = re.sub(r"\'re", " are ", text)
    text = re.sub(r"\'d", " would ", text)
    text = re.sub(r"\'ll", " will ", text)
    text = re.sub(r",", " ", text)
    text = re.sub(r"\.", " ", text)
    text = re.sub(r"!", " ! ", text)
    text = re.sub(r"\/", " ", text)
    text = re.sub(r"\^", " ^ ", text)
    text = re.sub(r"\+", " + ", text)
    text = re.sub(r"\-", " - ", text)
    text = re.sub(r"\=", " = ", text)
    text = re.sub(r"'", " ", text)
    text = re.sub(r"(\d+)(k)", r"\g<1>000", text)
    text = re.sub(r":", " : ", text)
    text = re.sub(r" e g ", " eg ", text)
    text = re.sub(r" b g ", " bg ", text)
    text = re.sub(r" u s ", " american ", text)
    text = re.sub(r"\0s", "0", text)
    text = re.sub(r" 9 11 ", "911", text)
    text = re.sub(r"e - mail", "email", text)
    text = re.sub(r"j k", "jk", text)
    text = re.sub(r"\s{2,}", " ", text)
    
    # Optionally, shorten words to their stems
    if stem_words:
        text = text.split()
        stemmer = SnowballStemmer('english')
        stemmed_words = [stemmer.stem(word) for word in text]
        text = " ".join(stemmed_words)
    
    # Return a list of words
    return(text)


# In[56]:

read = pd.read_csv(TRAIN_DATA_FILE, encoding='utf-8')
texts = [str(row[1]) + str(row[2]) for row in read.values]
labels = read[["type"]].values


read = pd.read_csv(TEST_DATA_FILE, encoding='utf-8')
test_texts = [str(row[1]) + str(row[2]) for row in read.values]
test_ids = read.index.values


# In[57]:


print('Found %s texts in test.csv' % len(test_texts))

tokenizer = Tokenizer(num_words=MAX_NB_WORDS)
tokenizer.fit_on_texts(texts + test_texts)

sequences = tokenizer.texts_to_sequences(texts)
#sequences_2 = tokenizer.texts_to_sequences(texts_2)
test_sequences = tokenizer.texts_to_sequences(test_texts)
#test_sequences_2 = tokenizer.texts_to_sequences(test_texts_2)

word_index = tokenizer.word_index
print('Found %s unique tokens' % len(word_index))

print('sequence length: {}'.format(len(sequences[0])))

data = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)
#data_2 = pad_sequences(sequences_2, maxlen=MAX_SEQUENCE_LENGTH)
labels = np.array(labels)
print('Shape of data tensor:', data.shape)
print('Shape of label tensor:', labels.shape)

test_data = pad_sequences(test_sequences, maxlen=MAX_SEQUENCE_LENGTH)
#test_data_2 = pad_sequences(test_sequences_2, maxlen=MAX_SEQUENCE_LENGTH)
test_ids = np.array(test_ids)


# In[59]:

########################################
## prepare embeddings
########################################
print('Preparing embedding matrix')

nb_words = min(MAX_NB_WORDS, len(word_index))+1

embedding_matrix = np.zeros((nb_words, EMBEDDING_DIM))
for word, i in word_index.items():
    if word in word2vec.vocab:
        try:
            embedding_matrix[i] = word2vec.word_vec(word)
        except:
            pass
print('Null word embeddings: %d' % np.sum(np.sum(embedding_matrix, axis=1) == 0))

########################################
## sample train/validation data
########################################
from sklearn.model_selection import train_test_split


data_train, data_val, labels_train, labels_val = train_test_split(data, labels, test_size=VALIDATION_SPLIT)

labels_train = [int(i) for i in labels_train.ravel()]
labels_val = [int(i) for i in labels_val.ravel()]

# np.random.seed(1234)
# perm = np.random.permutation(len(data))
# idx_train = perm[:int(len(data)*(1-VALIDATION_SPLIT))]
# idx_val = perm[int(len(data)*(1-VALIDATION_SPLIT)):]

# data_train = data[idx_train]
# # data_2_train = np.vstack((data_2[idx_train], data_1[idx_train]))
# labels_train = labels[idx_train]

# data_val = data[idx_val]
# # data_2_val = np.vstack((data_2[idx_val], data_1[idx_val]))
# labels_val = labels[idx_val]

# # weight_val = np.ones(len(labels_val))
# # if re_weight:
# #     weight_val *= 0.472001959
# #     weight_val[labels_val==0] = 1.309028344


# In[23]:

########################################
## define the model structure
########################################
embedding_layer = Embedding(nb_words,
        EMBEDDING_DIM,
        weights=[embedding_matrix],
        input_length=MAX_SEQUENCE_LENGTH,
        trainable=False)
lstm_layer = LSTM(num_lstm, dropout=rate_drop_lstm, recurrent_dropout=rate_drop_lstm)

sequence_input = Input(shape=(MAX_SEQUENCE_LENGTH,), dtype='int32')
embedded_sequences = embedding_layer(sequence_input)
x1 = lstm_layer(embedded_sequences)

#y1 = Input(shape=(featureshape))

#merged = concatenate([x1, y1])
merged = BatchNormalization()(x1)
merged = Dense(150, activation=act)(merged)
merged = Dropout(0.2)(merged)
merged = BatchNormalization()(merged)
merged = Dense(50, activation=act)(merged)
merged = Dropout(0.2)(merged)
#merged = BatchNormalization()(merged)
preds = Dense(1, activation='sigmoid')(merged)

########################################
## add class weight
########################################
# if re_weight:
#     class_weight = {'0': 1.309028344, '1': 0.472001959}
# else:
#     class_weight = None


# In[15]:

########################################
## train the model
########################################
print("TRAINING...")
model = Model(inputs=sequence_input, outputs=preds)
model.compile(loss='binary_crossentropy',
        optimizer='nadam',
        metrics=['acc'])
print(model.summary())
print(STAMP)

early_stopping =EarlyStopping(monitor='val_loss', patience=3)
#bst_model_path = STAMP + '.h5'
#model_checkpoint = ModelCheckpoint(bst_model_path, save_best_only=True, save_weights_only=False)

hist = model.fit(data_train, labels_train,                  #weight_val at the end of the next line
        validation_data=(data_val, labels_val), \
        epochs=4, batch_size=128, shuffle=True, \
        callbacks=[early_stopping], verbose=2)

#model.load_weights(bst_model_path)
bst_val_score = min(hist.history['val_loss'])


# In[ ]:

########################################
## make the submission
########################################
print('Start making the submission before fine-tuning')

preds = model.predict([test_data], batch_size=150, verbose=1)

submission = pd.DataFrame({'test_id':test_ids, 'is_duplicate':preds.ravel()})
submission.to_csv('%.4f_'%(bst_val_score)+STAMP+'.csv', index=False)


# In[26]:

from sklearn.metrics import classification_report
print(classification_report(y_true=test.type.values, y_pred=[np.argmax(i) for i in preds.ravel()]))


# In[ ]:

model.save("model.h5")

