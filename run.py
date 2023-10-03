from app.app import app
from app.scheduler import configure_scheduler, init_scheduler

configure_scheduler(app)

if __name__ == '__main__':
    init_scheduler(app)
    app.run(debug=True)
    