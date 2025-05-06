#room.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, Text
from sqlalchemy.orm import relationship
from ..database import Base

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String(50), unique=True, index=True)
    is_active_game = Column(Boolean, default=False)
    current_question_index = Column(Integer, nullable=True)
    asked_questions = Column(Text, nullable=True)
    remaining_questions = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.now())

    users = relationship("User", secondary="room_users", back_populates="rooms")
    game_sessions = relationship("GameSession", back_populates="room")