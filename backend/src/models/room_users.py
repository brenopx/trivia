#room_users.py
from sqlalchemy import Table, Column, Integer, ForeignKey
from ..database import Base

room_users = Table(
    "room_users",
    Base.metadata,
    Column("room_id", Integer, ForeignKey("rooms.id"), primary_key=True),
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
)