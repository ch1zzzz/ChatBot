# File Name: app.py
# Author: Jackson Zuo
# Date Created: 2023-09-28
# Description: This module contains REST API of the app.

from flask import Flask, request, jsonify, render_template
import os
import openai
from dotenv import load_dotenv
from qa import getqa, get_session_id

# OPENAI API KEY
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__, template_folder="templates")
app.secret_key = os.getenv('SECRET_KEY')

user_qa = {}


@app.route('/')
def home():
    return 'All is well...'


@app.route('/test')
def test():
    return render_template('index.html')


@app.route('/dialogflow/cx/receiveMessage', methods=['POST'])
def cxReceiveMessage():
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

    qa = user_qa[session_id]

    print(user_qa.keys())

    # Use this tag peoperty to choose the action
    # tag = data['fulfillmentInfo']['tag']
    query_text = data['text']

    result = qa.run({"question": query_text})
    print(f"Chatbot: {result}")

    return jsonify(
        {
            'fulfillment_response': {
                'messages': [
                    {
                        'text': {
                            'text': [result],
                            'redactedText': [result]
                        },
                        'responseType': 'HANDLER_PROMPT',
                        'source': 'VIRTUAL_AGENT'
                    }
                ]
            }
        }
    )
