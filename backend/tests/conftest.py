from sqlalchemy import text, create_engine
import os
import pytest
import sys
# Update Python path to enable correctly importing config.py and main.py
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))
from config import app as test_app, db
# Import routes module
import main


# Adapted code from:
# https://flask.palletsprojects.com/en/stable/tutorial/tests/
# https://flask.palletsprojects.com/en/stable/testing/
# https://medium.com/@hello_9187/unit-testing-a-flask-api-910b19c38ee2
# https://github.com/pallets/flask/blob/main/examples/tutorial/flaskr/db.py


@pytest.fixture()
def test_flask_app():
    test_db_name = "test_citizen_science_app"

    # Store original configuration
    original_db_uri = test_app.config["SQLALCHEMY_DATABASE_URI"]

    # Create engine for database operations
    engine = create_engine("mysql+pymysql://capstone:OSUcapstone@localhost/")

    # Create a test database
    try:
        with engine.connect() as conn:
            conn.execute(text(f"DROP DATABASE IF EXISTS {test_db_name}"))
            conn.execute(text(f"CREATE DATABASE {test_db_name}"))
            print(f"Created database {test_db_name}")
    except Exception as e:
        print(f"Error creating database: {e}")
        raise e

    # Update app configuration with test database
    test_db_uri = f"mysql+pymysql://capstone:OSUcapstone@localhost/{test_db_name}"
    test_app.config.update({
        "TESTING": True,
        'SQLALCHEMY_DATABASE_URI': test_db_uri,
        'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    })

    # Create database tables based on SQLAlchemy models
    with test_app.app_context():
        db.create_all()
        db.session.commit()

    yield test_app

    # Cleanup
    with test_app.app_context():
        # remove all session data
        db.session.remove()
        # drop all tables
        db.drop_all()
        # close connection
        db.engine.dispose()

    # Drop test database
    try:
        with engine.connect() as conn:
            conn.execute(text(f"DROP DATABASE IF EXISTS {test_db_name}"))
            print(f"Dropped database {test_db_name}")
    except Exception as e:
        print(f"Error dropping database: {e}")
    finally:
        engine.dispose()

    # Restore original configuration
    test_app.config["SQLALCHEMY_DATABASE_URI"] = original_db_uri


@pytest.fixture
def client(test_flask_app):
    with test_flask_app.test_client() as test_client:
        with test_flask_app.app_context():
            yield test_client


@pytest.fixture
def runner(test_flask_app):
    return test_flask_app.test_cli_runner()