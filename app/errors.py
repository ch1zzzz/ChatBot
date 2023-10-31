# @author     : Jackson Zuo
# @time       : 10/31/2023
# @description:
from flask import jsonify, render_template

from app import app


@app.errorhandler(500)
def handle_internal_server_error(error):
    return "Something went wrong on our end. Please try again later.", 500

