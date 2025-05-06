from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True)
    created_at = Column(DateTime, default=func.now())

    rooms = relationship("Room", secondary="room_users", back_populates="users")
    player_scores = relationship("PlayerScore", back_populates="user")