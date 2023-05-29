import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.history = action.payload;
    },
    newMessage: (state, action: PayloadAction<Message>) => {
      state.history.push(action.payload);
    },
  },
});

export const { setMessages, newMessage } = messageSlicer.actions;

export default messageSlicer.reducer;
