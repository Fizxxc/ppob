import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
