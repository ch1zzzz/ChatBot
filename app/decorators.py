# @author     : Jackson Zuo
# @time       : 10/17/2023
# @description: validate request by referer

from functools import wraps
from flask import request, abort


def require_valid_referer(view_func):
    @wraps(view_func)
    def decorated_function(*args, **kwargs):
        referer = request.headers.get('Referer')
        if referer and "http://127.0.0.1:5000/" in referer:
            return view_func(*args, **kwargs)
        else:
            abort(403)

    return decorated_function
