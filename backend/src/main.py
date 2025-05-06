from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware  # Importe CORSMiddleware
from .routers import game as game_router
from .sockets import game_socket
from .database import engine, Base
from .models import room, user, question, game_session, player_score

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost",
    "https://localhost",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(game_router.router)

@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(engine)

@app.websocket("/ws/game/{room_id}/{player_name}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, player_name: str):
    await game_socket.websocket_endpoint(websocket, room_id, player_name)