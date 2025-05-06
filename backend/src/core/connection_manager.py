from fastapi import WebSocket
from sqlalchemy.orm import Session

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict = {}  # {room_id: {player_name: WebSocket}}

    async def connect(self, websocket: WebSocket, room_id: str, player_name: str):
        if room_id not in self.active_connections:
            self.active_connections[room_id] = {}
        self.active_connections[room_id][player_name] = websocket

    def disconnect(self, websocket: WebSocket, room_id: str, player_name: str, db: Session):
        print(f"DEBUG: Tentando desconectar jogador '{player_name}' da sala '{room_id}'.")
        if room_id in self.active_connections and player_name in self.active_connections[room_id]:
            print(f"DEBUG: Jogador '{player_name}' encontrado em active_connections.")
            del self.active_connections[room_id][player_name]
            from ..models.room import Room
            from ..models.user import User
            room = db.query(Room).filter(Room.room_id == room_id).first()
            print(f"DEBUG: Sala encontrada para desconexão: {room}")
            user = db.query(User).filter(User.name == player_name).first()
            print(f"DEBUG: Usuário encontrado para desconexão: {user}")
            if room and user in room.users:
                print(f"DEBUG: Removendo usuário '{player_name}' da lista de usuários da sala.")
                room.users.remove(user)
                try:
                    db.commit()
                    print(f"DEBUG: Commit da remoção do usuário '{player_name}' realizado.")
                except Exception as e:
                    print(f"DEBUG: Erro durante o commit da remoção: {e}")
            else:
                print(f"DEBUG: Sala ou usuário não encontrados ou usuário não na lista da sala.")
            if not self.active_connections[room_id]:
                del self.active_connections[room_id]
                print(f"DEBUG: active_connections para a sala '{room_id}' está vazia, removendo entrada.")
        else:
            print(f"DEBUG: Jogador '{player_name}' não encontrado em active_connections para a sala '{room_id}'.")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, room_id: str):
        if room_id in self.active_connections:
            for connection in self.active_connections[room_id].values():
                await connection.send_text(message)

manager = ConnectionManager()