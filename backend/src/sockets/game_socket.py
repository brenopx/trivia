# backend/src/sockets/game_socket.py
from fastapi import WebSocket, WebSocketDisconnect, Depends
from ..game_logic.game_manager import game_manager
from sqlalchemy.orm import Session
from ..database import get_db, SessionLocal
from ..models.room import Room
from ..models.user import User
from ..core.connection_manager import manager
import json

print(f"DEBUG: Tipo de game_manager importado: {type(game_manager)}")
print(f"DEBUG: Atributos de game_manager: {dir(game_manager)}")

async def websocket_endpoint(websocket: WebSocket, room_id: str, player_name: str):
    db: Session = SessionLocal()
    try:
        try:
            print(f"DEBUG: Conexão WebSocket para sala '{room_id}', jogador '{player_name}' iniciada.")
            await websocket.accept()  # ACEITAR A CONEXÃO IMEDIATAMENTE

            room = db.query(Room).filter(Room.room_id == room_id).first()
            print(f"DEBUG: Sala encontrada: {room}")

            if room:
                print(f"DEBUG: Jogadores na sala ANTES da verificação: {[u.name for u in room.users]}")
                if player_name not in [user.name for user in room.users]:
                    print(f"DEBUG: Jogador '{player_name}' NÃO está na lista.")
                    user = db.query(User).filter(User.name == player_name).first()
                    print(f"DEBUG: Usuário encontrado: {user}")
                    if not user:
                        print(f"DEBUG: Criando novo usuário '{player_name}'.")
                        user = User(name=player_name)
                        db.add(user)
                        db.commit()
                        db.refresh(user)
                        print(f"DEBUG: Novo usuário criado com ID: {user.id}")
                    print(f"DEBUG: Adicionando usuário '{player_name}' à sala.")
                    room.users.append(user)
                    db.commit()
                    print(f"DEBUG: Usuário '{player_name}' adicionado à sala. Jogadores AGORA: {[u.name for u in room.users]}")
                    await manager.connect(websocket, room_id, player_name)
                    await manager.broadcast(f"Jogador '{player_name}' entrou na sala '{room_id}'. Jogadores: {[u.name for u in room.users]}", room_id)
                    game_manager.player_connected(room_id, player_name)
                    print('antes')
                    print(f"DEBUG: Número de usuários na sala '{room_id}': {len(room.users)}")
                    print(f"DEBUG: Sala '{room_id}' já existe em game_manager.games: {room_id in game_manager.games}")
                    if len(room.users) == 1 and room_id not in game_manager.games:
                        print(f"DEBUG: Condição para iniciar o jogo satisfeita para sala '{room_id}' com jogador '{player_name}'.")
                        await game_manager.start_game(room_id)
                        first_question = await game_manager.send_next_question(room_id)
                        if first_question:
                            await manager.broadcast(json.dumps(first_question), room_id)
                    elif room_id in game_manager.games and game_manager.games[room_id].get('current_question'):
                        # Se o jogo já começou, envia a pergunta atual para o novo jogador (usando .get para evitar KeyError)
                        await manager.send_personal_message(json.dumps({"type": "pergunta", "data": game_manager.games[room_id]['current_question']}), websocket)

                    try:
                        while True:
                            data = await websocket.receive_text()
                            try:
                                message = json.loads(data)
                                if message.get("type") == "resposta":
                                    result = game_manager.process_answer(room_id, player_name, message["data"]["resposta"])
                                    if result:
                                        await manager.send_personal_message(json.dumps(result), websocket)
                                        next_question = await game_manager.advance_question(room_id)
                                        if next_question:
                                            await manager.broadcast(json.dumps(next_question), room_id)
                                        elif next_question and next_question["type"] == "fim_jogo":
                                            await manager.broadcast(json.dumps(next_question), room_id)

                            except json.JSONDecodeError:
                                print(f"DEBUG: Mensagem não JSON recebida: {data}")
                                await manager.broadcast(f"'{player_name}': {data}", room_id)
                    except WebSocketDisconnect:
                        print(f"DEBUG: Jogador '{player_name}' desconectou.")
                        await manager.disconnect(websocket, room_id, player_name, db)
                        await manager.broadcast(f"Jogador '{player_name}' saiu da sala '{room_id}'.", room_id)
                    except Exception as e:
                        print(f"DEBUG (INNER TRY): Erro durante a comunicação WebSocket: {e}")
                        await manager.disconnect(websocket, room_id, player_name, db)
                        await manager.broadcast(f"Jogador '{player_name}' saiu da sala '{room_id}' devido a um erro.", room_id)
                else:
                    print(f"DEBUG: Jogador '{player_name}' já está na sala.")
                    await manager.connect(websocket, room_id, player_name)
                    await manager.send_personal_message("Você já está nesta sala.", websocket)
            else:
                print(f"DEBUG: Sala '{room_id}' não encontrada.")
                await websocket.close(code=1000, reason="Sala não encontrada")
        except Exception as e:
            print(f"DEBUG (OUTER TRY): Erro geral no websocket_endpoint: {e}")
    finally:
        print(f"DEBUG: Fechando sessão do banco de dados.")
        db.close()