from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.room import Room
from ..models.user import User
import uuid
from typing import Annotated

router = APIRouter()

@router.post("/create_room")
async def create_room(player_name: str, db: Annotated[Session, Depends(get_db)]):
    try:
        room_id = str(uuid.uuid4())
        db_room = Room(room_id=room_id)
        db.add(db_room)


        # Criar o usuário que criou a sala
        db_user = db.query(User).filter(User.name == player_name).first()
        if not db_user:
            db_user = User(name=player_name)
            db.add(db_user)
            db.commit()
            db.refresh(db_user)

        db_room.users.append(db_user) #adiciona o user na sala
        db.commit() #commita a transação
        db.refresh(db_room)
        return {"room_id": room_id}
    except Exception as e:
        db.rollback()
        raise