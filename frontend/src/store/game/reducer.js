import * as actionTypes from './actionTypes';

const initialState = {
  roomId: null,
  playerName: null,
  connectionStatus: 'disconnected',
  currentQuestion: null,
  players: [],
  score: {},
  message: '',
  socket: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };
    case actionTypes.SET_PLAYER_NAME:
      return {
        ...state,
        playerName: action.payload,
      };
    case actionTypes.SET_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.payload,
      };
    case actionTypes.SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
      };
    case actionTypes.SET_PLAYERS:
      return {
        ...state,
        players: action.payload,
      };
    case actionTypes.SET_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case 'UPDATE_SCORE': // Lógica para atualizar a pontuação (simulada)
      return {
        ...state,
        score: {
          ...state.score,
          [action.payload.playerName]: (state.score[action.payload.playerName] || 0) + action.payload.score,
        },
      };
    default:
      return state;
  }
};

export default gameReducer;