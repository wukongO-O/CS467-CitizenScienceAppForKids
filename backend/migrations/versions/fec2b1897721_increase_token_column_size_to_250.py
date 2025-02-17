"""Increase token column size to 250

Revision ID: fec2b1897721
Revises: 
Create Date: 2025-02-16 20:32:23.237659

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fec2b1897721'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('Anonymous_users', 'token', type_=sa.String(250))


def downgrade():
    op.alter_column('Anonymous_users', 'token', type_=sa.String(10))
