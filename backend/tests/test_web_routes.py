import pytest
from config import db
from models import User, Classes, Projects, Observations, Anonymous_users

#  pytest test_web_routes.py -v -s


# -------------------- INDEX ROUTE TESTS --------------------
def test_index_route(client):
    """
    checking that pytest and test fixtures are working correctly
    """
    print("Starting test_index_route...")
    response = client.get("/")
    assert response.status_code == 200
    data = response.get_json()
    assert data["message"] == "Welcome to the Citizen Science App!"
    print("Finished test_index_route!")


# -------------------- USER ROUTE TESTS --------------------
def test_create_user(client):
    """
    Test POST /users to create a new user
    """

    print("Starting test_create_user...")
    # mock a new user
    new_user = {
        "username": "alice",
        "email": "alice@example.com",
        "role": "teacher",
        "password": "secret123"
    }
    print("New user data:", new_user)
    print("Sending POST request to /users...")
    # send it to the endpoint as JSON
    response = client.post("/users", json=new_user)

    # Should return 201 Created
    assert response.status_code == 201
    print("Response:", response.get_json())

    # Check response body, should have the new user's data
    res_json = response.get_json()
    assert res_json["user"]["username"] == "alice"
    assert res_json["user"]["email"] == "alice@example.com"
    print("Finished test_create_user!" + "\n")


def test_fail_create_user(client):
    """
    Test POST /users with invalid data
    """
    print("Starting test_fail_create_user...")
    # missing email
    new_user = {}
    response = client.post("/users", json=new_user)
    # Should return 400 Bad Request
    assert response.status_code == 400
    print("Response:", response.get_json())
    print("Finished test_fail_create_user!" + "\n")


def test_get_users(client):
    """
    Test GET /users to retrieve all users
    """
    # Insert a user directly into the DB
    print("Starting test_get_users...")
    with client.application.app_context():
        user = User(username="bob", email="bob@example.com", role="teacher")
        user.password = "bobpass"
        db.session.add(user)
        db.session.commit()

    # call the endpoint
    print("Sending GET request to /users...")
    response = client.get("/users")
    assert response.status_code == 200
    users_list = response.get_json()
    # There's at least 1 user: 'bob'
    assert any(u["username"] == "bob" for u in users_list)
    print("Finished test_get_users!" + "\n")


def test_fail_get_user(client):
    """
    Test GET /users/<int:user_id> with invalid user_id
    """
    print("Starting test_fail_get_user...")
    # Invalid user_id
    response = client.get("/users/999")
    # Should return 404 Not Found
    assert response.status_code == 404
    print("Response:", response.get_json())
    print("Finished test_fail_get_user!" + "\n")


def test_update_user(client):
    """
    Test PUT /users/<int:user_id>
    """
    print("Starting test_update_user...")

    # Insert user to update
    with client.application.app_context():
        print("Creating user in DB...")
        user = User(username="charlie", email="charlie@example.com",
                    role="teacher")
        user.password = "charliepass"  # Should be hashed automatically
        db.session.rollback() # Ensure we start a new transaction
        db.session.add(user)
        db.session.commit()
        user_id = user.id
        print(f"User created with ID: {user_id}")

    # Verify password is stored hashed (before update)
    with client.application.app_context():
        print("Verifying password before update...")
        saved_user = User.query.get(user_id)
        if saved_user:
            print(f"User found: {saved_user.username}")
        else:
            print("ERROR: User not found!")
        # Should NOT be plaintext
        assert saved_user.password_hash != "charliepass"
        # Should verify correctly
        assert saved_user.verify_password("charliepass")

    # Update the user
    print("Sending PUT request to update user...")
    update_data = {
        "username": "charlie_new",
        "email": "charlie_new@example.com",
        "role": "admin"
    }
    response = client.put(f"/users/{user_id}", json=update_data)
    print("Response received:", response.status_code)
    assert response.status_code == 200

    # Verify the update in the DB
    with client.application.app_context():
        print("Checking updated user in DB...")
        updated_user = User.query.get(user_id)
        if updated_user:
            print(f"Updated User: {updated_user.username}")
        else:
            print("ERROR: User not found after update!")
        assert updated_user.username == "charlie_new"
        assert updated_user.email == "charlie_new@example.com"
        assert updated_user.role == "admin"

        # Password should still be correctly hashed and verify correctly
        print("Verifying password after update...")
        assert updated_user.verify_password("charliepass")

    print("Finished test_update_user!" + "\n")


def test_fail_update_user(client):
    """
    Test PUT /users/<int:user_id> with invalid user_id
    """
    print("Starting test_fail_update_user...")
    # Invalid user_id
    update_data = {
        "username": "charlie_new",
        "email": "",
        "role": "admin"
    }
    response = client.put("/users/999", json=update_data)
    # Should return 404 Not Found
    assert response.status_code == 404
    print("Response:", response.get_json())
    print("Finished test_fail_update_user!" + "\n")


def test_delete_user(client):
    """
    Test DELETE /users/<int:user_id>
    """
    
    print("Starting test_delete_user...")
    # Insert a user to delete
    with client.application.app_context():
        user = User(username="dave", email="dave@example.com", role="teacher")
        user.password = "davepass"
        db.session.add(user)
        db.session.commit()
        user_id = user.id

    # Delete it
    response = client.delete(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.get_json()["message"] == "User deleted successfully!"

    # Check the DB
    with client.application.app_context():
        assert User.query.get(user_id) is None

    print("Finished test_delete_user!" + "\n")


def test_fail_delete_user(client):
    """
    Test DELETE /users/<int:user_id> with invalid user_id
    """
    print("Starting test_fail_delete_user...")
    # Invalid user_id
    response = client.delete("/users/999")
    # Should return 404 Not Found
    assert response.status_code == 404
    print("Response:", response.get_json())
    print("Finished test_fail_delete_user!" + "\n")


# -------------------- CLASSES ROUTE TESTS --------------------
def test_create_class(client):
    """
    Test POST /classes to create a new class
    """

    print("Starting test_create_class...")
    # Need a teacher in DB first
    with client.application.app_context():
        teacher = User(username="teacher1", email="teacher1@example.com",
                       role="teacher")
        teacher.password = "teacherpass"
        db.session.add(teacher)
        db.session.commit()
        teacher_id = teacher.id

    new_class = {
        "teacher_id": teacher_id,
        "class_code": "BIO101",
        "class_name": "Biology 101",
        "description": "Intro to Biology",
        "number_of_students": 25
    }
    response = client.post("/classes", json=new_class)
    assert response.status_code == 201
    json_data = response.get_json()
    assert json_data["class"]["class_name"] == "Biology 101"
    assert json_data["class"]["description"] == "Intro to Biology"
    assert json_data["class"]["number_of_students"] == 25
    print("Finished test_create_class!" + "\n")


# -------------------- PROJECTS ROUTE TESTS --------------------
def test_create_project(client):
    """
    Test POST /projects
    """
    print("Starting test_create_project...")
    with client.application.app_context():
        # Create teacher & class
        teacher = User(username="teacher_proj",
                       email="teacher_proj@example.com",
                       role="teacher")
        teacher.password = "teapass"
        db.session.add(teacher)
        db.session.commit()

        new_class = Classes(
            teacher_id=teacher.id,
            class_code="ABC123",
            class_name="Some Class",
            description="Some Description",
            number_of_students=25
        )
        db.session.add(new_class)
        db.session.commit()

        class_id = new_class.class_id
        teacher_id = teacher.id

    data = {
        "class_id": class_id,
        "teacher_id": teacher_id,
        "project_code": "PRJ001",
        "title": "Water Quality",
        "description": "Check water sources",
        "directions": "Step 1: Collect samples, Step 2: Test pH",
        "form_definition": {"questions": ["Q1", "Q2"]}
    }
    response = client.post("/projects", json=data)
    assert response.status_code == 201
    assert response.get_json()["message"] == "Project created successfully!"
    print("Finished test_create_project!" + "\n")


# -------------------- OBSERVATIONS ROUTE TESTS --------------------

def test_create_observation(client):
    """
    Test POST /observations
    """
    print("Starting test_create_observation...")
    
    with client.application.app_context():
        # Create teacher & class
        teacher = User(username="teacher_proj", email="teacher_proj@example.com", role="teacher")
        teacher.password = "teapass"
        db.session.add(teacher)
        db.session.commit()

        new_class = Classes(
            teacher_id=teacher.id,
            class_code="ABC123",
            class_name="Some Class",
            description="Some Description",
            number_of_students=25
        )
        db.session.add(new_class)
        db.session.commit()

        class_id = new_class.class_id
        teacher_id = teacher.id

        # Create project linked to this class
        project_data = Projects(
            class_id=class_id,
            teacher_id=teacher_id,
            project_code="PRJ001",
            title="Water Quality",
            description="Check water sources",
            directions="Step 1: Collect samples, Step 2: Test pH",
            form_definition={"questions": ["Q1", "Q2"]}
        )
        db.session.add(project_data)
        db.session.commit()

        project_id = project_data.project_id

        # Create an anonymous user
        anon_user = Anonymous_users(token="sample_token")
        db.session.add(anon_user)
        db.session.commit()

        anon_user_id = anon_user.anon_user_id

    # Observation data
    observation_data = {
        "project_id": project_id,
        "anon_user_id": anon_user_id,
        "data": {"pH": 7.2, "turbidity": "low"}
    }

    # Send POST request to add observation
    response = client.post("/observations", json=observation_data)
    assert response.status_code == 201
    assert response.get_json()["message"] == "Observation added successfully!"

    # Verify the observation exists in the database
    with client.application.app_context():
        saved_obs = Observations.query.filter_by(project_id=project_id).first()
        assert saved_obs is not None
        assert saved_obs.anon_user_id == anon_user_id
        assert saved_obs.data == {"pH": 7.2, "turbidity": "low"}

    print("Finished test_create_observation!" + "\n")
