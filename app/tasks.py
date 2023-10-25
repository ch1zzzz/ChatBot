# @author     : Jackson Zuo
# @time       : 10/5/2023
# @description: tasks to do by scheduler

import time
from datetime import datetime

from app.app import user_qa, user_expiry


# delete expired conversation
def delete_expired_sessions():
    """
    Delete chain if it is expired

    """
    current_time = time.time()
    sessions_to_delete = []

    for session_id, expiry_time in user_expiry.items():
        if current_time > expiry_time:
            sessions_to_delete.append(session_id)

    for session_id in sessions_to_delete:
        del user_qa[session_id]
        del user_expiry[session_id]

    print("expired session deleted: " + str(datetime.now()))
