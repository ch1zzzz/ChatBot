import time
from app.app import user_qa, user_expiry


# delete expired conversation
def delete_expired_sessions():
    current_time = time.time()
    sessions_to_delete = []

    for session_id, expiry_time in user_expiry.items():
        if current_time > expiry_time:
            sessions_to_delete.append(session_id)

    for session_id in sessions_to_delete:
        del user_qa[session_id]
        del user_expiry[session_id]
