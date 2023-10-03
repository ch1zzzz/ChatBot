# File Name: app.py
# Author: Jackson Zuo
# Date Created: 2023-09-28
# Description: Create embeddings for input file.

import os
import openai
from langchain.document_loaders import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from dotenv import load_dotenv

load_dotenv()

# openai api keys
openai.api_key = os.getenv('OPENAI_API_KEY')

# Load CSV file
loader = CSVLoader("data/nursejobs.csv", encoding="cp1252")
documents = loader.load()

# split documents to chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
texts = text_splitter.split_documents(documents)
embeddings = OpenAIEmbeddings()

# Create vector database by FAISS
db = FAISS.from_documents(documents=texts,
                          embedding=embeddings,
                          )

# save the embeddings and reload it
db.save_local("faiss_index_nursejobs")
