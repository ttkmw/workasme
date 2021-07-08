import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import signReducer from './signSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sign: signReducer
  },
});
