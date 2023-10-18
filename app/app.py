# @author     : Jackson Zuo
# @time       : 10/5/2023
# @description: This module contains REST API of the app.

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import openai
import time
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import logging

from app.decorators import require_valid_referer
from app.embeddings import embedding
from app.helper import allowed_file
from app.question_answer_chain import getqa, get_session_id
from config import Config

# Load OPENAI API Key
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

# set app secret key
app = Flask(__name__, template_folder="templates")
app.secret_key = os.getenv('SECRET_KEY')
CORS(app)
logging.basicConfig(filename='app.log', level=logging.DEBUG)

# store qa chain for each user: {session_id:ConversationalRetrievalChain}
user_qa = {}
# store expiration for each chain: {session_id:expiration}
user_expiry = {}


@app.route('/')
def home():
    app.logger.info('This is an info message.')
    app.logger.warning('This is a warning message.')
    app.logger.error('This is an error message.')
    return render_template('index.html')


@app.route('/test')
def test():
    return render_template('test.html')


@app.route('/base')
def chatbot():
    return render_template('base.html')


@app.route('/upload')
def upload():
    return render_template('upload.html')


@app.route('/uploadFile', methods=['POST'])
def upload_file():
    """
    upload positions files

    Returns: success page

    """
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']

    if file.filename == '':
        return 'No selected file'

    if file and allowed_file(file.filename):  # check file suffix
        filename = secure_filename('nursejobs.csv')
        path = os.path.join(Config.UPLOAD_FOLDER, filename)
        file.save(path)
        embedding()  # calculate the embeddings from new data
        return 'File successfully uploaded'

    return render_template('upload.html')


@app.route('/predict', methods=['POST'])
@require_valid_referer
def predict():
    text = request.get_json().get("message")
    session_id = request.get_json().get("sessionId")
    print(session_id)
    print(text)
    # TODO: check if text is valid
    if user_qa.get(session_id) is None:
        user_qa[session_id] = getqa()

    # set the conversation expire time to 10 minutes
    user_expiry[session_id] = time.time() + 600

    qa = user_qa[session_id]

    print(user_qa.keys())

    result = qa.run({"question": text})
    #print(f"Chatbot: {result}")

    message = {"answer": result}
    return jsonify(message)


@app.route('/dialogflow/cx/receiveMessage', methods=['POST'])
def cx_receive_message():
    """
    Create a chain for each session and get answer from GPT

    Returns: Json to DialogFlow

    """

    data = request.get_json()
    session_id = get_session_id(data)
    if session_id is None:
        return jsonify(
            {
                'fulfillment_response': {
                    'messages': [
                        {
                            'text': {
                                'text': ['Something went wrong.'],
                                'redactedText': ['Something went wrong.']
                            },
                            'responseType': 'HANDLER_PROMPT',
                            'source': 'VIRTUAL_AGENT'
                        }
                    ]
                }
            }
        )

    if user_qa.get(session_id) is None:
        user_qa[session_id] = getqa()

    # set the conversation expire time to 10 minutes
    user_expiry[session_id] = time.time() + 600

    qa = user_qa[session_id]
    query_text = data['text']
    result = qa.run({"question": query_text})
    print(f"Chatbot: {result}")
    print("result finished!!!!!!!!")

    # return jsonify(
    #     {
    #         'fulfillment_response': {
    #             'messages': [
    #                 {
    #                     'text': {
    #                         'text': [result],
    #                         'redactedText': [result]
    #                     },
    #                     'responseType': 'HANDLER_PROMPT',
    #                     'source': 'VIRTUAL_AGENT'
    #                 }
    #             ]
    #         }
    #     }
    # )
    res = {"fulfillment_response": {"messages": [{"text": {"text": [result]}}]}}

    # Returns json
    return res
