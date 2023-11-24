import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authConfig = {
  key: '/auth',
  storage
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
});
 
export default reducer;