# player_score.py
from sqlalchemy import Column, Integer, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from ..database import Base

class PlayerScore(Base):
    __tablename__ = "player_scores"

    id = Column(Integer, primary_key=True, index=True)
    game_session_id = Column(Integer, ForeignKey("game_sessions.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Integer, default=0)
    answered_at = Column(DateTime, nullable=True)

    game_session = relationship("GameSession", back_populates="player_scores")
    user = relationship("User", back_populates="user")