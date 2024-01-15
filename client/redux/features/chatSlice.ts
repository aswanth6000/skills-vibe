import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Sender {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
}

interface LatestMessage {
  _id: string;
  sender: Sender;
  content: string;
  chat: string;
  readBy: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface User {
  _id: string;
  username: string;
  phone: string;
  email: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  __v: number;
}

interface ChatState {
  selectedChat: string | null;
  user: User | null;
  notification: LatestMessage[];
  chats: string | null;
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
    chatAll: (state: ChatState, action: PayloadAction<ChatState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { chatAll } = chatSlice.actions;
export default chatSlice.reducer;
