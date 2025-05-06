import React, { useState, useEffect, useRef } from 'react';
import Question from './Question';
import { Container, Typography, Box, Button, List, ListItemText, Divider, ListItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { connectGame, sendAnswer, leaveRoom, nextQuestion } from '../store/game/thunks';
import { useNavigate } from 'react-router-dom';
import { setCurrentQuestion, updateScore } from '../store/game/actions'; // Importe updateScore

function GameScreen() {
  const roomId = useSelector((state) => state.game.roomId);
  const playerName = useSelector((state) => state.game.playerName);
  const currentQuestion = useSelector((state) => state.game.currentQuestion);
  const players = useSelector((state) => state.game.players);
  const score = useSelector((state) => state.game.score);
  const message = useSelector((state) => state.game.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState(null);
  const [playerAnswers, setPlayerAnswers] = useRef({}); // Ref para rastrear respostas de todos os jogadores
  const [feedbackTimeout, setFeedbackTimeout] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const totalQuestions = 10;

  useEffect(() => {
    if (roomId && playerName) {
      dispatch(connectGame(roomId, playerName));
      setQuestionNumber(1);
      playerAnswers.current = {}; // Limpa as respostas ao entrar na sala ou nova rodada
    }
  }, [roomId, playerName, dispatch]);

  useEffect(() => {
    if (roomId === null) {
      navigate('/');
    }
  }, [roomId, navigate]);

  const handleAnswer = (answer, isCorrect) => {
    if (!playerAnswers.current[playerName]) { // Impede respostas múltiplas
      setUserAnswer(answer);
      playerAnswers.current[playerName] = { answer, isCorrect };

      if (isCorrect && players.length > 1) {
        dispatch(updateScore({ playerName, score: 1 }));
        setFeedbackTimeout(setTimeout(() => {
          dispatch(nextQuestion(roomId, playerName));
          setUserAnswer(null);
          playerAnswers.current = {};
        }, 2000));
      } else if (players.length <= 1) {
        dispatch(sendAnswer(currentQuestion.id, answer, roomId, playerName)); // Para feedback individual
        setTimeout(() => {
          dispatch(nextQuestion(roomId, playerName));
          setUserAnswer(null);
        }, 2000);
      }

      // Lógica para avançar se todos responderam (incorretamente ou situação da última alternativa)
      if (Object.keys(playerAnswers.current).length === players.length && players.length > 1) {
        const correctAnswersCount = Object.values(playerAnswers.current).filter(a => a.isCorrect).length;
        const wrongAnswersCount = Object.values(playerAnswers.current).filter(a => !a.isCorrect).length;
        const allWrong = wrongAnswersCount === players.length;
        const lastOptionScenario = currentQuestion?.options?.length > 1 && wrongAnswersCount === players.length - 1 && !Object.values(playerAnswers.current).some(a => a.isCorrect);

        if (allWrong || lastOptionScenario) {
          setTimeout(() => {
            dispatch(nextQuestion(roomId, playerName));
            setUserAnswer(null);
            playerAnswers.current = {};
          }, 2000);
        } else if (correctAnswersCount > 0) {
          // Já tratado acima com o feedback individual
        }
      }
    }
  };

  const handleLeave = () => {
    dispatch(leaveRoom(roomId, playerName));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Sala: {roomId} - Pergunta {questionNumber}/{totalQuestions}
        </Typography>
        <Typography variant="subtitle1">Você está jogando como: {playerName}</Typography>

        {currentQuestion ? (
          <Question question={currentQuestion} onAnswer={handleAnswer} userAnswer={userAnswer} correctAnswer={currentQuestion.answer} />
        ) : (
          <Typography variant="h6">{message || 'Aguardando a próxima pergunta...'}</Typography>
        )}

        <Typography variant="h6" sx={{ mt: 3 }}>
          Jogadores:
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {Object.keys(score).map((player, index) => (
            <React.Fragment key={player}>
              <ListItem>
                <ListItemText primary={player} secondary={`Pontuação: ${score[player] || 0}`} />
              </ListItem>
              {index !== Object.keys(score).length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        <Button variant="outlined" color="error" onClick={handleLeave} sx={{ mt: 3 }}>
          Sair da Sala
        </Button>
      </Box>
    </Container>
  );
}

export default GameScreen;