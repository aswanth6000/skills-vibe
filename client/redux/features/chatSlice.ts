import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  selectedChat: any;
  user: any;
  notification: any;
  chats: any;
}

const initialState: ChatState = {
  selectedChat: null,
  user: null,
  notification: [],
  chats: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat: (state, action: PayloadAction<any>) => {
      state.selectedChat = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setNotification: (state, action: PayloadAction<any[]>) => {
      state.notification = action.payload;
    },
    setChats: (state, action: PayloadAction<any>) => {
      state.chats = action.payload;
    },
  },
});

export const { setSelectedChat, setUser, setNotification, setChats } = chatSlice.actions;
export default chatSlice.reducer;
