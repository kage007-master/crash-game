import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Message {
  text: string;
  address: string;
  avatar: string;
  time: Date;
}

interface MessageState {
  history: Message[];
}

const initialState: MessageState = {
  history: [],
};

export const messageSlicer = createSlice({
  name: "message",
  initialState,
  reducers: {
    newMessage: (state, action: PayloadAction<Message>) => {
      state.history.push(action.payload);
    },
  },
});

export const { newMessage } = messageSlicer.actions;

export default messageSlicer.reducer;
