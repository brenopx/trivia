from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"  # Ou sua URL de banco de dados

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Defina get_db ANTES de importar os modelos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Importe os modelos APÓS a declaração de Base e get_db
from .models.user import User
from .models.room import Room
from .models.room_users import room_users