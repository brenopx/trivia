import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game/reducer';

const store = configureStore({
  reducer: {
    game: gameReducer,
    // Adicione outros reducers aqui se necessário
  },
});

export default store;