import * as actionTypes from './actionTypes';

export const setRoomId = (roomId) => ({
  type: actionTypes.SET_ROOM_ID,
  payload: roomId,
});

export const setPlayerName = (playerName) => ({
  type: actionTypes.SET_PLAYER_NAME,
  payload: playerName,
});

export const setConnectionStatus = (status) => ({
  type: actionTypes.SET_CONNECTION_STATUS,
  payload: status,
});

export const setCurrentQuestion = (question) => ({
  type: actionTypes.SET_CURRENT_QUESTION,
  payload: question,
});

export const setPlayers = (players) => ({
  type: actionTypes.SET_PLAYERS,
  payload: players,
});

export const setScore = (score) => ({
  type: actionTypes.SET_SCORE,
  payload: score,
});

export const setMessage = (message) => ({
  type: actionTypes.SET_MESSAGE,
  payload: message,
});

// Action para simular atualização de pontuação
export const updateScore = (payload) => ({
  type: 'UPDATE_SCORE',
  payload,
});