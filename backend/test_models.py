import unittest
from main import app
from models import User


class UserModelTestCase(unittest.TestCase):
    """
    The following test are provided/inspired by "Flask Mega-Tutorial"
    by Miguel Grinberg
    https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-viii-followers
    """

    def test_password_setter(self):
        u = User(password='cat')
        self.assertTrue(u.password_hash is not None)

    def test_no_password_getter(self):
        u = User(password='cat')
        with self.assertRaises(AttributeError):
            u.password

    def test_password_verification(self):
        u = User(password='cat')
        self.assertTrue(u.verify_password('cat'))
        self.assertFalse(u.verify_password('dog'))

    def test_password_salts_are_random(self):
        u = User(password='cat')
        u2 = User(password='cat')
        self.assertTrue(u.password_hash != u2.password_hash)


if __name__ == "__main__":
    unittest.main()
