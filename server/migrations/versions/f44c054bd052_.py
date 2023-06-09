"""empty message

Revision ID: f44c054bd052
Revises: 0152b3e103b4
Create Date: 2023-04-17 15:27:03.909685

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f44c054bd052'
down_revision = '0152b3e103b4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price', sa.Float(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.drop_column('price')

    # ### end Alembic commands ###
