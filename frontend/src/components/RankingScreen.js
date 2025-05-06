import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RankingScreen() {
  const navigate = useNavigate();
  const scoreHistory = [ // Dados mock para o histórico (será substituído por dados reais do backend)
    { name: 'Jogador 1', score: 15 },
    { name: 'Jogador 2', score: 12 },
    { name: 'Jogador 3', score: 10 },
    { name: 'Jogador 4', score: 9 },
    { name: 'Jogador 5', score: 8 },
    { name: 'Jogador 6', score: 7 },
    { name: 'Jogador 7', score: 6 },
    { name: 'Jogador 8', score: 5 },
    { name: 'Jogador 9', score: 4 },
    { name: 'Jogador 10', score: 3 },
  ].sort((a, b) => b.score - a.score).slice(0, 10);

  const handleBackToLobby = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ m: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ranking dos Top 10
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {scoreHistory.map((item) => (
            <ListItem key={item.name}>
              <ListItemText primary={item.name} secondary={`Pontuação: ${item.score}`} />
            </ListItem>
          ))}
        </List>
        <Button variant="outlined" onClick={handleBackToLobby}>
          Voltar ao Lobby
        </Button>
      </Box>
    </Container>
  );
}

export default RankingScreen;