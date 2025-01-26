from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

# Create the Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)


# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://capstone:OSUcapstone@localhost/citizen_science_app"


app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Create the database object & the migration object
db = SQLAlchemy(app)
migrate = Migrate(app, db)
