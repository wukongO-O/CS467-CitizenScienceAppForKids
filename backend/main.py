from config import app, db
from flask import request, jsonify
from models import User, Classes, Projects, Anonymous_users, Observations
from token_generator import generate_token


# Test Route
@app.route("/")
def index():
    return jsonify({"message": "Welcome to the Citizen Science App!"})


# -------------------- USER ROUTES --------------------
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
        new_user.password = data["password"] # use hashing
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
    return jsonify(result)


# Get a user by id
@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        return jsonify({"id": user.id, "username": user.username,
                        "email": user.email, "role": user.role})
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
        )
        db.session.add(new_class)
        db.session.commit()
        return jsonify({"message": "Class created successfully!",
                        "class": data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get all classes for a teacher
@app.route("/classes/<int:teacher_id>", methods=["GET"])
def get_classes(teacher_id):
    classes = Classes.query.filter_by(teacher_id=teacher_id).all()
    result = [{"class_id": c.class_id, "class_name": c.class_name,
               "description": c.description} for c in classes]
    return jsonify(result)


# Get a class by id
@app.route("/classes/<int:class_id>", methods=["GET"])
def get_class(class_id):
    # class is a keyword so added an underscore
    class_ = Classes.query.filter_by(class_id=class_id).first()
    if class_:
        teacher = User.query.filter_by(id=class_.teacher_id).first()
        return jsonify({"class_id": class_.class_id,
                        "teacher_id": class_.teacher_id,
                        "teacher_name": teacher.username,  # may remove
                        "class_name": class_.class_name,
                        "description": class_.description})


# Update a class by id
@app.route("/classes/<int:class_id>", methods=["PUT"])
def update_class(class_id):
    data = request.json
    class_ = Classes.query.filter_by(class_id=class_id).first()
    if class_:
        class_.class_code = data["class_code"]
        class_.class_name = data["class_name"]
        class_.description = data["description"]
        db.session.commit()
        return jsonify({"message": "Class updated successfully!",
                        "class": data}), 200


# Delete a class by id
@app.route("/classes/<int:class_id>", methods=["DELETE"])
def delete_class(class_id):
    class_ = Classes.query.filter_by(class_id=class_id).first()
    if class_:
        db.session.delete(class_)
        db.session.commit()
        return jsonify({"message": "Class deleted successfully!"}), 200
    return jsonify({"error": "Class not found"}), 404


# -------------------- PROJECTS ROUTES --------------------
# Create a new project
@app.route("/projects", methods=["POST"])
def create_project():
    data = request.json
    try:
        new_project = Projects(
            class_id=data["class_id"],
            teacher_id=data["teacher_id"],
            project_code=data["project_code"],
            title=data["title"],
            description=data["description"],
            form_definition=data["form_definition"],
        )
        db.session.add(new_project)
        db.session.commit()
        return jsonify({"message": "Project created successfully!",
                        "project": data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get all projects for a class
@app.route("/projects/<int:class_id>", methods=["GET"])
def get_projects(class_id):
    projects = Projects.query.filter_by(class_id=class_id).all()
    result = [{"project_id": p.project_id, "title": p.title,
               "description": p.description} for p in projects]
    return jsonify(result)


# Get a project from class code for mobile
@app.route("/projects/class_code/<string:class_code>", methods=["GET"])
def get_project_by_class_code(class_code):
    class_obj = Classes.query.filter_by(class_code=class_code).first()
    if not class_obj:
        return jsonify({"error": "Class not found"}), 404

    project_obj = Projects.query.filter_by(
        class_id=class_obj.class_id).first()

    result = {
        "project_id": project_obj.project_id,
        "title": project_obj.title,
        "description": project_obj.description,
        "directions": project_obj.directions
    }

    return jsonify(result)


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
        return jsonify({"message": "Observation added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get observations for a project
@app.route("/observations/<int:project_id>", methods=["GET"])
def get_observations(project_id):
    observations = Observations.query.filter_by(project_id=project_id).all()
    result = [
        {"obs_id": o.obs_id, "anon_user_id": o.anon_user_id, "data": o.data,
         "timestamp": o.timestamp.isoformat()}
        for o in observations
    ]
    return jsonify(result)


# Update an observation
@app.route("/observations/<int:obs_id>", methods=["PUT"])
def edit_observation(obs_id):
    updated_data = request.json
    try:
        observation = Observations.query.get(obs_id)
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
                        "anon_user_id": new_user.anon_user_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get anonymous user by token
@app.route("/anonymous_users/<string:token>", methods=["GET"])
def get_anonymous_user(token):
    anon_user = Anonymous_users.query.filter_by(token=token).first()
    if anon_user:
        return jsonify({"anon_user_id": anon_user.anon_user_id,
                        "token": anon_user.token})
    return jsonify({"error": "Anonymous user not found"}), 404


# -------------------- RUN THE APP --------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
