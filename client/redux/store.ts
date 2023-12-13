import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import authReducer from './features/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap the authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

// Create the persisted store
const persistor = persistStore(store);

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a custom hook to use with useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export both the store and persistor for use in the application
export { store, persistor };
