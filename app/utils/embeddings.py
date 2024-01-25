# @author     : Jackson Zuo
# @time       : 10/5/2023
# @description: Create embeddings for input file.


from langchain_community.document_loaders import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from config import Config


def embedding():
    """
    save the positions file to embeddings

    """
    # Load CSV file
    loader = CSVLoader("data/nursejobs.csv", encoding="cp1252")
    documents = loader.load()

    # split documents to chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)
    embeddings = OpenAIEmbeddings()

    # Create vector database by FAISS
    db = FAISS.from_documents(documents=texts, embedding=embeddings)

    # save the embeddings for reloading
    db.save_local(Config.FAISS_INDEX_PATH)
