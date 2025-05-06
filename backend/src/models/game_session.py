# game_session.py
from sqlalchemy import Column, Integer, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from ..database import Base

class GameSession(Base):
    __tablename__ = "game_sessions"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(Integer, ForeignKey("rooms.id"))
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=True)
    question_index = Column(Integer, default=0)
    started_at = Column(DateTime, default=func.now())
    ended_at = Column(DateTime, nullable=True)

    room = relationship("Room", back_populates="game_sessions")
    question = relationship("Question", back_populates="game_sessions")
    player_scores = relationship("PlayerScore", back_populates="game_session")