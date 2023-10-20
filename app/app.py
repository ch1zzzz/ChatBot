# @author     : Jackson Zuo
# @time       : 10/5/2023
# @description: This module contains REST API of the app.

import asyncio
import threading
from queue import Queue
from typing import AsyncIterable

from flask import Flask, request, jsonify, render_template, Response
from flask_cors import CORS
import os
import openai
import time
from dotenv import load_dotenv
from langchain.callbacks import AsyncIteratorCallbackHandler, StreamingStdOutCallbackHandler
from werkzeug.utils import secure_filename
import logging

from app.decorators import require_valid_referer
from app.embeddings import embedding
from app.helper import allowed_file
from app.question_answer_chain import getqa, get_session_id
from app.streaming import StreamingStdOutCallbackHandlerYield, generate
from config import Config

# Load OPENAI API Key
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

# set app secret key
app = Flask(__name__, template_folder="templates")
app.secret_key = os.getenv('SECRET_KEY')
CORS(app)
logging.basicConfig(filename='app.log', level=logging.INFO)

# store qa chain for each user: {session_id:ConversationalRetrievalChain}
user_qa = {}
# store expiration for each chain: {session_id:expiration}
user_expiry = {}


@app.route('/')
def home():
    return render_template('index.html')


# page integrated with dialogflow
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
    logging.info(f"session_id: {session_id}, \n text: {text}")

    # TODO: check if text is valid

    # create new chain
    if user_qa.get(session_id) is None:
        user_qa[session_id] = getqa()

    # set the conversation expire time to 10 minutes
    user_expiry[session_id] = time.time() + 600

    qa = user_qa[session_id]

    # streaming test using openai api
    # def generate1():
    #     completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[
    #         {"role": "system", "content": "You're an assistant."},
    #         {"role": "user", "content": f"{text}"},
    #     ], stream=True, max_tokens=500, temperature=0)
    #
    #     for line in completion:
    #         if 'content' in line['choices'][0]['delta']:
    #             yield line['choices'][0]['delta']['content']

    # streaming the output
    q = Queue()

    def generate2():
        callback_fn = StreamingStdOutCallbackHandlerYield(q)
        return qa.run({"question": text}, callbacks=[callback_fn, StreamingStdOutCallbackHandler()])

    threading.Thread(target=generate2).start()
    return Response(generate(q), mimetype='text/event-stream')


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
