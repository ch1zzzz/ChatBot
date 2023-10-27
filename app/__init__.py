# @author     : Jackson Zuo
# @time       : 10/26/2023
# @description:
import logging
import os
import openai
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from werkzeug.exceptions import HTTPException


def create_app():
    # Load OPENAI API Key
    load_dotenv()
    openai.api_key = os.getenv('OPENAI_API_KEY')

    # connect to Langsmith
    os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")
    os.environ["LANGCHAIN_TRACING_V2"] = os.getenv("LANGCHAIN_TRACING_V2")
    os.environ["LANGCHAIN_ENDPOINT"] = os.getenv("LANGCHAIN_ENDPOINT")
    os.environ["LANGCHAIN_PROJECT"] = os.getenv("LANGCHAIN_PROJECT")

    # set app secret key
    my_app = Flask(__name__, template_folder="templates")
    my_app.secret_key = os.getenv('SECRET_KEY')
    CORS(my_app)
    logging.basicConfig(filename='Log.log', level=logging.INFO)

    # store qa chain for each user: {session_id:ConversationalRetrievalChain}
    my_app.user_qa = {}
    # # store expiration for each chain: {session_id:expiration}
    my_app.user_expiry = {}
    return my_app


app = create_app()

from app import views
