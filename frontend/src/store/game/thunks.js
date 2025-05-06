import * as actions from './actions';
import questions from '../../data/questions';

// Função auxiliar para simular atraso da rede
const fakeDelay = (ms) => new Promise((res) => setTimeout(res, ms));

// Thunk para conectar ao Lobby (simulado) e criar a sala
export const connectLobby = (playerName) => {
  return async (dispatch) => {
    dispatch(actions.setPlayerName(playerName));
    dispatch(actions.setConnectionStatus('connecting'));
    await fakeDelay(1000); // Simula um pequeno atraso

    // Simulação de sucesso na criação da sala
    const roomId = Math.random().toString(36).substring(7);
    dispatch(actions.setRoomId(roomId)); // Despacha a action para definir o ID da sala
    dispatch(actions.setConnectionStatus('connected'));
    console.log('Lobby conectado (simulado). Sala criada com ID:', roomId);

    // Simulação da criação da lista de jogadores na sala (apenas o criador)
    dispatch(actions.setPlayers([playerName]));

    // Simulação da inicialização da pontuação
    dispatch(actions.setScore({ [playerName]: 0 }));

    // A navegação será feita no componente após o despacho bem-sucedido
  };
};

// Thunk para conectar ao Jogo (simulado)
export const connectGame = (roomId, playerName) => {
  return async (dispatch) => {
    dispatch(actions.setRoomId(roomId));
    dispatch(actions.setPlayerName(playerName));
    dispatch(actions.setConnectionStatus('connecting'));
    await fakeDelay(1500); // Simula um pequeno atraso

    dispatch(actions.setConnectionStatus('connected'));
    console.log('Jogo conectado (simulado) na sala:', roomId, 'como jogador:', playerName);

    setTimeout(() => {
      const categorias = Object.keys(questions);
      const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
      const perguntasDaCategoria = questions[categoriaAleatoria];
      const perguntaAleatoria = perguntasDaCategoria[Math.floor(Math.random() * perguntasDaCategoria.length)];
      dispatch(actions.setCurrentQuestion(perguntaAleatoria));
    }, 2500);
  };
};

// Thunk para enviar uma resposta (simulado)
export const sendAnswer = (questionId, answer, roomId, playerName) => {
  return async (dispatch, getState) => { // Adicionamos getState para acessar o estado
    await fakeDelay(800);

    const categorias = Object.keys(questions);
    let perguntaCorreta = null;
    let respostaCorreta = '';
    for (const categoria of categorias) {
      const pergunta = questions[categoria].find(q => q.id === questionId);
      if (pergunta) {
        perguntaCorreta = pergunta.answer === answer;
        respostaCorreta = pergunta.answer;
        break;
      }
    }

    if (perguntaCorreta) {
      dispatch(actions.setMessage('Resposta correta!'));
      dispatch(actions.updateScore({ playerName, score: 1 })); // Despacha a action para atualizar a pontuação
    } else {
      dispatch(actions.setMessage(`Resposta incorreta. A resposta correta era: ${respostaCorreta}`));
    }

    // Simula o recebimento da próxima pergunta após um tempo
    setTimeout(() => {
      const categorias = Object.keys(questions);
      const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
      const perguntasDaCategoria = questions[categoriaAleatoria];
      const perguntaAleatoria = perguntasDaCategoria[Math.floor(Math.random() * perguntasDaCategoria.length)];
      dispatch(actions.setCurrentQuestion(perguntaAleatoria));
      dispatch(actions.setMessage('')); // Limpa a mensagem
    }, 3000);
  };
};

// Thunk para sair da sala (simulado)
export const leaveRoom = (roomId, playerName) => {
  return async (dispatch) => {
    await fakeDelay(500);
    dispatch(actions.setRoomId(null));
    dispatch(actions.setConnectionStatus('disconnected'));
    dispatch(actions.setPlayers([])); // Limpa a lista de jogadores
    dispatch(actions.setScore({}));    // Limpa a pontuação
    console.log('Jogador', playerName, 'saiu da sala', roomId, '(simulado).');
  };
};

// Thunk para ir para a próxima pergunta
export const nextQuestion = (roomId, playerName) => {
  return async (dispatch) => {
    await fakeDelay(1000);
    const categorias = Object.keys(questions);
    const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
    const perguntasDaCategoria = questions[categoriaAleatoria];
    const perguntaAleatoria = perguntasDaCategoria[Math.floor(Math.random() * perguntasDaCategoria.length)];
    dispatch(actions.setCurrentQuestion(perguntaAleatoria));
    dispatch(actions.setMessage(''));
  };
};