import { configureStore } from '@reduxjs/toolkit'; //legacy_createStore as createStore
import thunk from 'redux-thunk';
import rootReducer from '../redux';
import { authActions } from '../redux/auth.slice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: __DEV__,
  preloadedState: persistor,
});
export const persistor = persistStore(store);
