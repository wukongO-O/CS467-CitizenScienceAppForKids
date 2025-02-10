from sqlalchemy import text
import os
import pytest
import sys
# Update Python path to enable correctly importing config.py
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))
from config import app, db


# Code adapted from https://github.com/pallets/flask/blob/main/examples/tutorial/tests/test_auth.py


def test_anon_user_creation(client):
    # Test a user is created successfully
    response = client.post(
        '/anonymous_users', data={}
    )
    assert response.status_code == 201

    # Test that the newly created user was inserted into the database
    with app.app_context():
        new_token = response.json['token']
        result = db.session.execute(
            text("SELECT * FROM Anonymous_users WHERE token = :new_token"),
            {'new_token': new_token}
        ).fetchone()

        assert result is not None


def test_anon_user_authentication(client):
    # Test authenticating a given token
    new_anon_user = client.post(
        '/anonymous_users', data={}
    )
    new_token = new_anon_user.json['token']

    response = client.post(
        '/anonymous_users/authenticate', json={'token': new_token}
    )
    assert response.status_code == 200


# Test authentication errors
@pytest.mark.parametrize(('token', 'message'), (
    ('', b'Token is required'),
    ('test_token', b'Invalid token'),
))
def test_anon_user_auth_validate_input(client, token, message):
    response = client.post(
        '/anonymous_users/authenticate',
        json={'token': token}
    )
    assert message in response.data


def test_getting_anon_user(client):
    # Test getting an anonymous user from a given token
    new_anon_user = client.post(
        '/anonymous_users', data={}
    )
    new_token = new_anon_user.json['token']

    response = client.get(f'/anonymous_users/{new_token}')
    assert response.status_code == 200


# Test getting an anonymous user errors
@pytest.mark.parametrize(('token', 'status_code'), (
    ('', 404),
    ('test_token', 404),
))
def test_getting_anon_user_validate_input(client, token, status_code):
    response = client.get(f'/anonymous_users/{token}')
    assert response.status_code == 404