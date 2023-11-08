from app import app
from app.utils.embeddings import embedding
from app.utils.scheduler import configure_scheduler, init_scheduler


# config scheduler and perform embedding
def initialize_app():
    configure_scheduler(app)
    init_scheduler(app)
    embedding()
    print("Application started, performing initialization operations.")


# @app.before_serving
# @app.before_first_request
# def run_on_start():
#     initialize_app()


if __name__ == '__main__':
    with app.app_context():
        initialize_app()
    app.run(debug=True, host="0.0.0.0", port=5000)
