import secrets
import string
from sqlalchemy import select
from models import Anonymous_users


class TokenError(Exception):
    def __init__(self, error_message, status_code):
        self.error_message = error_message
        self.status_code = status_code


# Generate a random, unique, alphanumeric token, default to 10 characters. Max attempts default to 20.
def generate_token(db_session, length=10, max_attempts=20):
    for _ in range(max_attempts):
        alphabet = string.ascii_letters + string.digits
        new_token = ''.join(secrets.choice(alphabet) for _ in range(length))

        is_unique_token = db_session.execute(select(Anonymous_users).where(
            Anonymous_users.token == new_token)).scalar()

        if is_unique_token:
            return new_token

    raise TokenError(
        "Failed to create a unique token after maximum attempts.", 500)
