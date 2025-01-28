from config import db


# User Model
class User(db.Model):

    __tablename__ = 'User'

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(50), unique=True, nullable=False)

    password_hash = db.Column(db.String(16), nullable=False)

    email = db.Column(db.String(250), unique=True, nullable=False)

    role = db.Column(db.String(50), nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())

    updated_at = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())


# Classes Model
class Classes(db.Model):

    __tablename__ = 'Classes'

    class_id = db.Column(db.Integer, primary_key=True)

    teacher_id = db.Column(db.Integer, db.ForeignKey('User.id'),
                           nullable=False)

    class_code = db.Column(db.String(250), nullable=False)

    class_name = db.Column(db.String(50), nullable=False)

    description = db.Column(db.Text, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())

    updated_at = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())


# Projects Model
class Projects(db.Model):

    __tablename__ = 'Projects'

    project_id = db.Column(db.Integer, primary_key=True)

    class_id = db.Column(db.Integer, db.ForeignKey('Classes.class_id'),
                         nullable=False)

    teacher_id = db.Column(db.Integer, db.ForeignKey('User.id'),
                           nullable=False)

    project_code = db.Column(db.String(250), nullable=False)

    title = db.Column(db.String(250), nullable=False)

    description = db.Column(db.String(250), nullable=False)

    directions = db.Column(db.Text, nullable=False)

    form_definition = db.Column(db.JSON, nullable=False)

    start_date = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())

    due_at = db.Column(db.DateTime, server_default=db.func.now(),
                       server_onupdate=db.func.now())

    created_at = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())

    updated_at = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())


# Anonymous_users Model
class Anonymous_users(db.Model):

    __tablename__ = 'Anonymous_users'

    anon_user_id = db.Column(db.Integer, primary_key=True)

    token = db.Column(db.String(250), nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())


# Observations Model
class Observations(db.Model):

    __tablename__ = 'Observations'

    obs_id = db.Column(db.Integer, primary_key=True)

    project_id = db.Column(db.Integer, db.ForeignKey('Projects.project_id'),
                           nullable=False)

    anon_user_id = db.Column(db.Integer,
                             db.ForeignKey('Anonymous_users.anon_user_id'),
                             nullable=False)

    data = db.Column(db.JSON, nullable=False)

    timestamp = db.Column(db.DateTime, server_default=db.func.now(),
                          server_onupdate=db.func.now())
