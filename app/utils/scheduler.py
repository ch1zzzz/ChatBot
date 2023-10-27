# @author     : Jackson Zuo
# @time       : 10/5/2023
# @description: set up scheduler

from flask_apscheduler import APScheduler

# create Flask-APScheduler instance
scheduler = APScheduler()


# set scheduled tasks
def configure_scheduler(app):
    app.config['SCHEDULER_API_ENABLED'] = True
    app.config['JOBS'] = [
        {
            'id': 'cleanup_job',
            'func': 'app.utils.tasks:delete_expired_sessions',
            'trigger': 'interval',
            'seconds': 660
        }
    ]


# start Flask-APScheduler
def init_scheduler(app):
    scheduler.init_app(app)
    scheduler.start()
