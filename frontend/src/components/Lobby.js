import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { connectLobby } from '../store/game/thunks';
import { setRoomId } from '../store/game/actions';
import { useNavigate } from 'react-router-dom';

function Lobby() {
  const [createName, setCreateName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roomId = useSelector((state) => state.game.roomId);

  const handleCreate = () => {
    if (createName) {
      dispatch(connectLobby(createName));
    } else {
      alert('Por favor, digite seu nome.');
    }
  };

  useEffect(() => {
    if (roomId) {
      navigate('/game');
    }
  }, [roomId, navigate]);

  const [joinName, setJoinName] = useState('');
  const [roomIdToJoin, setRoomIdToJoin] = useState('');

  const handleJoin = () => {
    if (joinName && roomIdToJoin) {
      dispatch(setRoomId(roomIdToJoin));
      navigate('/game');
    } else {
      alert('Por favor, digite seu nome e o ID da sala.');
    }
  };

  const handleGoToRanking = () => {
    navigate('/ranking');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ m: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Button variant="outlined" onClick={handleGoToRanking}>
          Ver Ranking dos Top 10
        </Button>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }}>
          Criar Nova Sala
        </Typography>
        <TextField
          fullWidth
          label="Seu Nome"
          variant="outlined"
          value={createName}
          onChange={(e) => setCreateName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Criar Sala
        </Button>

        <Typography variant="h5" component="h2" sx={{ mt: 3 }} gutterBottom>
          Entrar em Sala Existente
        </Typography>
        <TextField
          fullWidth
          label="Seu Nome"
          variant="outlined"
          value={joinName}
          onChange={(e) => setJoinName(e.target.value)}
        />
        <TextField
          fullWidth
          label="ID da Sala"
          variant="outlined"
          value={roomIdToJoin}
          onChange={(e) => setRoomIdToJoin(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleJoin}>
          Entrar na Sala
        </Button>
      </Box>
    </Container>
  );
}

export default Lobby;