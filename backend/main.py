from config import app, db
from flask import jsonify, request
from models import User, Project, Observation


@app.route("/")  # Define a sample route to test the app
def index():
    return jsonify({"message": "Welcome to the Citizen Science App!"})


# for local development
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
