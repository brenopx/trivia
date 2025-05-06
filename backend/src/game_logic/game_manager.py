# backend/src/game_logic/game_manager.py
class GameManager:
    def __init__(self):
        self.games: dict = {}  # {room_id: {'current_question': ..., 'answers': {player_name: ...}, 'question_index': 0, 'questions': [...]}}
        self.questions = [
            {"pergunta": "Qual a capital do Brasil?", "opcoes": ["Brasília", "Rio de Janeiro", "São Paulo"], "resposta_correta": "Brasília"},
            {"pergunta": "Quanto é 2 + 2?", "opcoes": ["3", "4", "5"], "resposta_correta": "4"},
            {"pergunta": "Qual a cor do céu?", "opcoes": ["Azul", "Verde", "Amarelo"], "resposta_correta": "Azul"},
        ]

    def player_connected(self, room_id: str, player_name: str):
        print(f"GameManager: Jogador '{player_name}' conectado na sala '{room_id}'.")
        if room_id not in self.games:
            self.games[room_id] = {"players": [player_name], "pontuacao": {player_name: 0}}
        else:
            self.games[room_id]["players"].append(player_name)
            self.games[room_id]["pontuacao"][player_name] = 0

    async def start_game(self, room_id: str):
        print(f"DEBUG (GameManager): INÍCIO de start_game para a sala '{room_id}'.")
        if room_id not in self.games:
            self.games[room_id] = {
                'current_question': None,
                'answers': {},
                'question_index': 0,
                'questions': list(self.questions)  # Cria uma cópia para cada jogo
            }
            await self.send_next_question(room_id)
        else:
            print(f"DEBUG (GameManager): Jogo já iniciado para a sala '{room_id}'.")

    async def send_next_question(self, room_id: str):
        game_state = self.games.get(room_id)
        if game_state:
            if game_state['question_index'] < len(game_state['questions']):
                question_data = game_state['questions'][game_state['question_index']]
                game_state['current_question'] = question_data
                game_state['answers'] = {}  # Limpa as respostas para a nova pergunta
                print(f"DEBUG (GameManager): Enviando pergunta {game_state['question_index']}: {question_data['pergunta']} para a sala '{room_id}'.")
                return {"type": "pergunta", "data": {"pergunta": question_data["pergunta"], "opcoes": question_data["opcoes"], "question_index": game_state['question_index']}}
            else:
                print(f"DEBUG (GameManager): Fim do jogo para a sala '{room_id}'.")
                return {"type": "fim_jogo", "data": {"mensagem": "Fim do jogo!"}}
        else:
            print(f"DEBUG (GameManager): Estado do jogo não encontrado para a sala '{room_id}'.")
            return None

    def process_answer(self, room_id: str, player_name: str, answer: str):
        game_state = self.games.get(room_id)
        if game_state and game_state['current_question']:
            game_state['answers'][player_name] = answer
            correct = answer.lower() == game_state['current_question']['resposta_correta'].lower()
            print(f"DEBUG (GameManager): Jogador '{player_name}' respondeu '{answer}' na sala '{room_id}'. Correto: {correct}")
            return {"type": "resposta_processada", "data": {"jogador": player_name, "correta": correct, "resposta": answer}}
        return None

    async def advance_question(self, room_id: str):
        game_state = self.games.get(room_id)
        if game_state:
            game_state['question_index'] += 1
            print(f"DEBUG (GameManager): Avançando para a próxima pergunta na sala '{room_id}'. Índice agora: {game_state['question_index']}")
            return await self.send_next_question(room_id)
        return None

game_manager = GameManager()