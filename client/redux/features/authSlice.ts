import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  value: AuthState;
}

interface AuthState {
  isAuth: boolean;
  username: string;
  uid: string;
  isAdmin: boolean;
  token: string;
  
}

const initialState: InitialState = {
  value: {
    isAuth: false,
    username: '',
    uid: '',
    token: '',
    isAdmin: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<AuthState>) => {
      return {
        value: {
          ...action.payload,
          isAuth: true,
        },
      };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
