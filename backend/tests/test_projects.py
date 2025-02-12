import pytest


@pytest.fixture
def project_data(client):
    test_projects = [
        {
            "class_id": 1,
            "teacher_id": 800001,
            "project_code": "proj1",
            "title": "Test Project 1",
            "description": "Test Project 1's description",
            "directions": "Test Project 1's directions",
            "form_definition": {
                "form_field1": "",
                "form_field2": "",
                "form_field3": "",
            }
        },
        {
            "class_id": 1,
            "teacher_id": 800002,
            "project_code": "proj2",
            "title": "Test Project 2",
            "description": "Test Project 2's description",
            "directions": "Test Project 2's directions",
            "form_definition": {
                "form_field1": "",
                "form_field2": "",
                "form_field3": "",
            }
        },
        {
            "class_id": 2,
            "teacher_id": 800002,
            "project_code": "proj3",
            "title": "Test Project 3",
            "description": "Test Project 3's description",
            "directions": "Test Project 3's directions",
            "form_definition": {
                "form_field1": "",
                "form_field2": "",
                "form_field3": "",
            }
        }
    ]

    test_class = {
        "teacher_id": 800001,
        "class_code": "test",
        "class_name": "test class",
        "description": "Test class's description",
        "number_of_students": 15,
    }

    response_class = client.post('/classes', json=test_class)
    class_id = response_class.json["class_id"]
    assert response_class.status_code == 201

    project_ids_and_data = []
    for project in test_projects:
        response = client.post('/projects', json=project)
        assert response.status_code == 201
        project_ids_and_data.append({
            "proj_id": response.json["project_id"],
            "proj_data": project
        })

    yield project_ids_and_data

    # Clean up after testing
    for project_id, project_data in project_ids_and_data:
        client.delete(f'/projects/{project_id}')
    client.delete(f'/classes/{class_id}')


# Test getting all projects for a class
def test_getting_projects(client, project_data):
    # test class id 90001
    proj1_id, project_1 = project_data[0]["proj_id"], project_data[0]["proj_data"]
    class_id = project_1["class_id"]
    response = client.get(f'/projects/class/{class_id}')
    projects = response.json

    assert len(projects) == 2
    assert projects[0]["project_id"] == proj1_id


# Test getting projects from a class code for mobile
def test_getting_proj_by_class_code(client, project_data):
    # test class code: test
    response = client.get(f'/projects/class_code/test')
    projects = response.json

    assert response.status_code == 200
    assert len(projects) == 2

    # verify the second project matches test data
    proj2_id, project_2 = project_data[1]["proj_id"], project_data[1]["proj_data"]
    assert projects[1]["project_id"] == proj2_id


def test_getting_proj_by_nonexistent_class_code(client):
    response = client.get(f'/projects/class_code/taco')
    assert response.status_code == 404


# Test getting a single project from project id for mobile
def test_getting_a_project(client, project_data):
    proj1_id, project_1 = project_data[0]["proj_id"], project_data[0]["proj_data"]
    response = client.get(f'/projects/{proj1_id}')
    assert response.json["title"] == project_1["title"]


def test_getting_a_nonexistent_project(client, project_data):
    response = client.get(f'/projects/6666')
    assert response.status_code == 404
