import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import qcReducer from './slices/qcSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    qc: qcReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
