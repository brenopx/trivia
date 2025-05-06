# question.py
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from ..database import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    pergunta = Column(Text)
    opcoes = Column(Text)
    resposta_correta = Column(String(255))

    game_sessions = relationship("GameSession", back_populates="question")