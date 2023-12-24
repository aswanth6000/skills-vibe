import { createSlice,PayloadAction  } from "@reduxjs/toolkit";

interface InitialState{
    value: UserState
}

interface UserState{

}

const initialState: InitialState = {
    value: {
        username: '',
        userProfile: '',
        userPhone: 0,
        email: '',

    }
}

export const userSlice = createSlice({
    name: 'userDetails',
    initialState: initialState,
    reducers: {
        profileUpdated: (state, action: PayloadAction<UserState>) =>{
            return {
                value: {
                    ...action.payload
                }
            }
        }
    }
})

export const {profileUpdated} = userSlice.actions;
export default userSlice.reducer;