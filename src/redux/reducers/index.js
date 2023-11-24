import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import profileReducer from './profile.js';
import balanceReducer from './balance.js';
import transactionReducer from './transaction.js';

const authConfig = {
  key: '/auth',
  storage
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  profile: profileReducer,
  balance: balanceReducer,
  transaction: transactionReducer,
});
 
export default reducer;