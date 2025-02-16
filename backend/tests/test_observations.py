from sqlalchemy import text
import os
import pytest
import sys
# Update Python path to enable correctly importing config.py
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))
from config import app, db
from models import Observations


def test_adding_obs(client):
    # Test an observation is created successfully
    response = client.post(
        '/observations', json={
            "project_id": 1,
            "anon_user_id": 101,
            "data": {
                "location": "backyard",
                "weather": "sunny",
                "bird-count": 2,
                "note": "Spotted 1 cardinal and 1 owl."},
            "timestamp": "2025-02-01 11:22:33"
        }
    )

    assert response.status_code == 201

    # Test that the new observation was inserted into the database
    with app.app_context():
        new_obs_id = response.json["obs_id"]
        result = db.session.execute(
            text("SELECT * FROM Observations WHERE obs_id = :new_obs_id"),
            {"new_obs_id": new_obs_id}
        ).fetchone()

        assert result is not None


def test_getting_an_obs(client):
    # Test getting an observation from an observation id
    new_observation = client.post(
        '/observations', json={
            "project_id": 1,
            "anon_user_id": 101,
            "data": {
                "location": "backyard",
                "weather": "sunny",
                "bird-count": 4,
                "note": "Spotted 2 cardinals and 2 owls."},
            "timestamp": "2025-02-02 11:22:33"
        }
    )
    new_obs_id = new_observation.json["obs_id"]

    response = client.get(f'/observations/{new_obs_id}')
    assert response.status_code == 200


# Test getting an observation errors
@pytest.mark.parametrize(("obs_id", "status_code"), (
    ('a', 404),
    (10000, 404),
))
def test_getting_an_obs_validate_input(client, obs_id, status_code):
    response = client.get(f'/observations/{obs_id}')
    assert response.status_code == 404


# Test deleting an observation
def test_deleting_an_obs(client):
    # Test deleting an observation from an observation id
    new_observation = client.post(
        '/observations', json={
            "project_id": 1,
            "anon_user_id": 101,
            "data": {
                "location": "backyard",
                "weather": "sunny",
                "bird-count": 4,
                "note": "Spotted 2 cardinals and 2 owls."},
            "timestamp": "2025-02-02 11:22:33"
        }
    )
    new_obs_id = new_observation.json['obs_id']

    response = client.delete(f'/observations/{new_obs_id}')
    assert response.status_code == 200


def test_deleting_nonexistent_obs(client):
    response = client.delete(f'/observations/test')
    assert response.status_code == 404


# Test updating an observation
def test_updating_an_obs(client):
    original_obs = client.post(
        '/observations', json={
            "project_id": 1,
            "anon_user_id": 101,
            "data": {
                "location": "backyard",
                "weather": "sunny",
                "bird-count": 4,
                "note": "Spotted 2 cardinals and 2 owls."},
            "timestamp": "2025-02-02 11:22:33"
        }
    )
    original_obs_id = original_obs.json['obs_id']
    assert original_obs.status_code == 201

    updated_obs = client.put(
        f'/observations/{original_obs_id}', json={
            "project_id": 1,
            "anon_user_id": 101,
            "data": {
                "location": "front yard",
                "weather": "snowy",
                "bird-count": 1,
                "note": "Spotted 1 bluejay."},
            "timestamp": "2025-02-02 15:22:33"
        }
    )
    assert updated_obs.status_code == 200

    # Verify the changes were updated in the database
    result = db.session.get(Observations, original_obs_id)

    assert result is not None
    assert result.data["weather"] == "snowy"
    assert result.data["bird-count"] == 1


def test_updating_nonexistent_obs(client):
    response = client.put(f'/observations/test')
    assert response.status_code == 404


def test_getting_project_obs(client):
    # Test getting all observations from a project id
    observations = [
        {
            "project_id": 1,
            "anon_user_id": 101,
            "data": {
                "location": "backyard",
                "weather": "sunny",
                "bird-count": 4,
                "note": "Test data 1."
            }
        },
        {
            "project_id": 1,
            "anon_user_id": 102,
            "data": {
                "location": "front yard",
                "weather": "sunny",
                "bird-count": 3,
                "note": "Test data 2."
            }
        },
        {
            "project_id": 2,
            "anon_user_id": 103,
            "data": {
                "location": "park",
                "weather": "windy",
                "bird-count": 5,
                "note": "Test data 3."
            }
        }
    ]

    for obs in observations:
        client.post('/observations', json=obs)

    # Test getting all observations for project 1
    response_1 = client.get(f'/observations/project/1')
    assert response_1.status_code == 200
    assert len(response_1.get_json()) == 2

    # Test getting all observations for project 2
    response_2 = client.get(f'/observations/project/2')
    assert response_2.status_code == 200
    assert len(response_2.get_json()) == 1
