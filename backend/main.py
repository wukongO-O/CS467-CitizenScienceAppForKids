from config import app, db
from flask import request, jsonify
from models import User, Classes, Projects, Anonymous_users, Observations
from token_generator import generate_token
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import cross_origin
from datetime import datetime


# Adapted code for API from this guide:
# https://diptochakrabarty.medium.com/flask-python-swagger-for-rest-apis-6efdf0100bd7
SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.json"

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Citizen Science App for Kids API'
    }
)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

# Test Route
@app.route("/")
def index():
    return jsonify({"message": "Welcome to the Citizen Science App!"}), 200


# -------------------- USER ROUTES --------------------
# Login route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and user.verify_password(password):
        return jsonify({
            "message": "Login successful!",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401

# Create a new user (teacher/admin)
@app.route("/users", methods=["POST"])
def create_user():
    data = request.json
    try:
        new_user = User(
            username=data["username"],
            email=data["email"],
            role=data["role"],
        )
        new_user.password = data["password"]  # use hashing
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully!",
                        "user": data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get all users
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    result = [{"id": u.id, "username": u.username, "email": u.email,
               "role": u.role} for u in users]
    return jsonify(result), 200


# Get a user by id
@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        return jsonify({"id": user.id, "username": user.username,
                        "email": user.email, "role": user.role}), 200
    return jsonify({"error": "User not found"}), 404


# Update a user by id
@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.json
    user = User.query.filter_by(id=user_id).first()
    if user:
        user.username = data["username"]
        user.email = data["email"]
        user.role = data["role"]
        db.session.commit()
        return jsonify({"message": "User updated successfully!",
                        "user": data}), 200
    return jsonify({"error": "User not found"}), 404


# Delete a user by id
@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully!"}), 200
    return jsonify({"error": "User not found"}), 404


# -------------------- CLASSES ROUTES --------------------
# Create a new class
@app.route("/classes", methods=["POST"])
def create_class():
    data = request.json
    try:
        new_class = Classes(
            teacher_id=data["teacher_id"],
            class_code=data["class_code"],
            class_name=data["class_name"],
            description=data["description"],
            number_of_students=data["number_of_students"],
        )
        db.session.add(new_class)
        db.session.commit()
        return jsonify({"message": "Class created successfully!",
                        "class": data,
                        "class_id": new_class.class_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get all classes for a teacher
@app.route("/classes/<int:teacher_id>", methods=["GET"])
def get_classes(teacher_id):
    classes = Classes.query.filter_by(teacher_id=teacher_id).all()
    result = [{"class_id": c.class_id, "class_name": c.class_name,
               "description": c.description,
               "number_of_students": c.number_of_students} for c in classes]

    if result:
        return jsonify(result), 200
    else:
        return jsonify({"error": "No classes found"}), 404


# Get a class by id
@app.route("/class/<int:class_id>", methods=["GET"]) # changed to singular
def get_class(class_id):
    # class is a keyword so added an underscore
    class_ = Classes.query.filter_by(class_id=class_id).first()
    if class_:
        teacher = User.query.filter_by(id=class_.teacher_id).first()
        return jsonify({"class_id": class_.class_id,
                        "teacher_id": class_.teacher_id,
                        "teacher_name": teacher.username,  # may remove
                        "class_name": class_.class_name,
                        "description": class_.description,
                        "number_of_students": class_.number_of_students}), 200
    else:
        return jsonify({"error": "Class not found"}), 404


# Update a class by id
@app.route("/class/<int:class_id>", methods=["PUT"])
def update_class(class_id):
    data = request.json
    class_ = Classes.query.filter_by(class_id=class_id).first()

    if not class_:
        return jsonify({"error": "Class not found"}), 404

    if class_:
        if "class_code" in data:
            class_.class_code = data["class_code"]
        if "class_name" in data:
            class_.class_name = data["class_name"]
        if "description" in data:
            class_.description = data["description"]
        if "number_of_students" in data:
            class_.number_of_students = data["number_of_students"]

        db.session.commit()

        return jsonify({
            "message": "Class updated successfully!",
            "class_id": class_.class_id,
            "class_code": class_.class_code,
            "class_name": class_.class_name,
            "description": class_.description,
            "number_of_students": class_.number_of_students
        }), 200


# Delete a class by id
@app.route("/class/<int:class_id>", methods=["DELETE"])  # made singular
def delete_class(class_id):
    class_ = Classes.query.filter_by(class_id=class_id).first()
    if class_:
        db.session.delete(class_)
        db.session.commit()
        return jsonify({"message": "Class deleted successfully!"}), 200
    return jsonify({"error": "Class not found"}), 404


# -------------------- PROJECTS ROUTES --------------------
# Create a new project
# ensure OPTIONS method is allowed for CORS
@app.route("/projects", methods=["POST", "OPTIONS"])
# Add cross_origin decorator to allow CORS
# https://flask-cors.readthedocs.io/en/latest/
@cross_origin(origins="*",
              methods=["POST", "OPTIONS"],
              allow_headers=["Content-Type", "Authorization"])
def create_project():

    if request.method == "OPTIONS":
        # check preflight status
        return jsonify({"message": "Preflight OK"}), 200

    data = request.json
    try:
        new_project = Projects(
            class_id=data["class_id"],
            teacher_id=data["teacher_id"],
            project_code=data["project_code"],
            title=data["title"],
            description=data["description"],
            directions=data["directions"],
            form_definition=data["form_definition"],
            start_date=datetime.fromisoformat(data["start_date"])
            if "start_date" in data else db.func.now(),
            due_at=datetime.fromisoformat(data["due_at"])
            if "due_at" in data else db.func.now(),
        )
        db.session.add(new_project)
        db.session.commit()
        return jsonify({"message": "Project created successfully!",
                        "project": data,
                        "project_id": new_project.project_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get all projects for a class - added a prefix to avoid url conflict
# with getting a single project
@app.route("/projects/class/<int:class_id>", methods=["GET"])
def get_projects(class_id):
    projects = Projects.query.filter_by(class_id=class_id).all()
    result = [{"project_id": p.project_id,
               "title": p.title,
               "description": p.description,
               "start_date": p.start_date.isoformat(),
               "due_at": p.due_at.isoformat(),
               } for p in projects]
    return jsonify(result), 200


# Get projects from class code for mobile
@app.route("/projects/class_code/<string:class_code>", methods=["GET"])
def get_projects_by_class_code(class_code):
    class_obj = Classes.query.filter_by(class_code=class_code).first()
    if not class_obj:
        return jsonify({"error": "Class not found"}), 404

    project_objs = Projects.query.filter_by(
        class_id=class_obj.class_id).all()

    result = [{
        "project_id": project_obj.project_id,
        "title": project_obj.title,
        "description": project_obj.description,
        "directions": project_obj.directions
    } for project_obj in project_objs]

    return jsonify(result), 200


# Get a project from project id
@app.route("/projects/<int:project_id>", methods=["GET"])
def get_a_project(project_id):
    project_obj = Projects.query.filter_by(project_id=project_id).first()
    if not project_obj:
        return jsonify({"error": "Project not found"}), 404

    class_obj = Classes.query.filter_by(class_id=project_obj.class_id).first()
    if not class_obj:
        return jsonify({"error": "Class not found"}), 404

    result = {
        "project_id": project_obj.project_id,
        "title": project_obj.title,
        "description": project_obj.description,
        "directions": project_obj.directions,
        "form_definition": project_obj.form_definition,
        "start_date": project_obj.start_date.isoformat(),
        "due_at": project_obj.due_at.isoformat(),
        "created_at": project_obj.created_at.isoformat(),
        "updated_at": project_obj.updated_at.isoformat(),
        "class": {
            "class_id": class_obj.class_id,
            "class_name": class_obj.class_name,
            "description": class_obj.description,
            "number_of_students": class_obj.number_of_students
        }
    }

    return jsonify(result), 200


# Update a project form project id
@app.route("/projects/<int:project_id>", methods=["PUT"])
def update_a_project(project_id):
    data = request.json
    project_obj = Projects.query.filter_by(project_id=project_id).first()

    if not project_obj:
        return jsonify({"error": "Project not found"}), 404

    if project_obj:
        if "project_code" in data:
            project_obj.project_code = data["project_code"]
        if "title" in data:
            project_obj.title = data["title"]
        if "description" in data:
            project_obj.description = data["description"]
        if "directions" in data:
            project_obj.directions = data["directions"]
        if "form_definition" in data:
            project_obj.form_definition = data["form_definition"]
        if "start_date" in data:
            project_obj.start_date = data["start_date"]
        if "due_at" in data:
            project_obj.due_at = data["due_at"]

        db.session.commit()

        return jsonify({
            "message": "Project updated successfully!",
            "project_id": project_obj.project_id,
            "project_code": project_obj.project_code,
            "title": project_obj.title,
            "description": project_obj.description,
            "directions": project_obj.directions,
            "form_definition": project_obj.form_definition,
            "start_date": project_obj.start_date.isoformat(),
            "due_at": project_obj.due_at.isoformat()
        }), 200


# -------------------- OBSERVATIONS ROUTES --------------------
# Add an observation
@app.route("/observations", methods=["POST"])
def add_observation():
    data = request.json
    try:
        new_observation = Observations(
            project_id=data["project_id"],
            anon_user_id=data["anon_user_id"],
            data=data["data"],
        )
        db.session.add(new_observation)
        db.session.commit()
        return jsonify({"message": "Observation added successfully!",
                        "obs_id": new_observation.obs_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get observations for a project
@app.route("/observations/project/<int:project_id>", methods=["GET"])
def get_observations(project_id):
    observations = Observations.query.filter_by(project_id=project_id).all()
    result = [
        {"obs_id": o.obs_id, "anon_user_id": o.anon_user_id, "data": o.data,
         "timestamp": o.timestamp.isoformat()}
        for o in observations
    ]
    return jsonify(result), 200


# Get an observation
@app.route("/observations/<int:obs_id>", methods=["GET"])
def get_an_observation(obs_id):
    observation = Observations.query.filter_by(obs_id=obs_id).first()
    if not observation:
        return jsonify({"error": "Observation not found"}), 404

    result = {
        "obs_id": observation.obs_id,
        "anon_user_id": observation.anon_user_id,
        "data": observation.data,
        "timestamp": observation.timestamp.isoformat()
    }

    return jsonify(result), 200


# Delete an observation by id
@app.route("/observations/<int:obs_id>", methods=["DELETE"])
def delete_observation(obs_id):
    observation = Observations.query.filter_by(obs_id=obs_id).first()
    if observation:
        db.session.delete(observation)
        db.session.commit()
        return jsonify({"message": "Observation deleted successfully!"}), 200
    return jsonify({"error": "Observation not found"}), 404


# Update an observation
@app.route("/observations/<int:obs_id>", methods=["PUT"])
def edit_observation(obs_id):
    updated_data = request.json
    try:
        observation = db.session.get(Observations, obs_id)
        if not observation:
            return jsonify({"error": "Observation not found"}), 404

        observation.project_id = updated_data.get(
            "project_id", observation.project_id)
        observation.anon_user_id = updated_data.get(
            "anon_user_id", observation.anon_user_id)
        observation.data = updated_data.get("data", observation.data)

        db.session.commit()
        return jsonify({"message": "Observation updated successfully!"}), 200
    except Exception as e:
        # https://stackoverflow.com/questions/33284334/how-to-make-flask-sqlalchemy-automatically-rollback-the-session-if-an-exception
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# -------------------- ANONYMOUS USERS ROUTES --------------------
# Create an anonymous user
@app.route("/anonymous_users", methods=["POST"])
def create_anonymous_user():
    try:
        new_token = generate_token(db.session)
        new_user = Anonymous_users(token=new_token)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Anonymous user created successfully!",
                        "anon_user_id": new_user.anon_user_id,
                        "token": new_token}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Authenticate an anonymous user by token
@app.route("/anonymous_users/authenticate", methods=["POST"])
def authenticate_anon_user():
    data = request.json
    token = data.get("token")
    if not token:
        return jsonify({"error": "Token is required"}), 404

    anon_user = Anonymous_users.query.filter_by(token=token).first()
    if anon_user:
        return jsonify({"message": "Authentication successful!",
                        "anon_user_id": anon_user.anon_user_id}), 200
    return jsonify({"error": "Invalid token"}), 401


# Get anonymous user by token
@app.route("/anonymous_users/<string:token>", methods=["GET"])
def get_anonymous_user(token):
    anon_user = Anonymous_users.query.filter_by(token=token).first()
    if anon_user:
        return jsonify({"anon_user_id": anon_user.anon_user_id,
                        "token": anon_user.token}), 200
    return jsonify({"error": "Anonymous user not found"}), 404


# -------------------- RUN THE APP --------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True,host="0.0.0.0",port=5000)
