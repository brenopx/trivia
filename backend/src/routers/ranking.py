from fastapi import APIRouter

router = APIRouter()

@router.get("/ranking")
async def get_top_ranking():
    # Lógica para obter o ranking (a ser implementada)
    top_scores = [{"name": "Jogador 1", "score": 100}, {"name": "Jogador 2", "score": 95}] # Placeholder
    return top_scores

# Outras rotas relacionadas ao ranking podem vir aqui