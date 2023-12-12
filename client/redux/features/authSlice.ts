import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitialState{
    value: AuthState;
}
interface AuthState{
    isAuth: boolean;
    username: string;
    uid: string;
    isAdmin: boolean

}

const initialState: InitialState = {
    value: {
        isAuth: false,
        username: '',
        uid: '',
        isAdmin: false
    }
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logOut: () =>{
            return initialState 
        },
        logIn: (state, action: PayloadAction<string>)=>{
            return {
                value: {
                    isAuth: true,
                    username: action.payload,
                    uid: action.payload,
                    isAdmin: false
                }
            }
        }
    }

})

export const {logIn, logOut} = authSlice.actions;
export default authSlice.reducer


