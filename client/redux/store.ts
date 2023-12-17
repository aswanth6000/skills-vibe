import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import authReducer from './features/authSlice';

// Create the Redux store without persisting the state
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a custom hook to use with useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export the store for use in the application
export { store };
