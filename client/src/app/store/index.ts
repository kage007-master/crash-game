import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import crashReducer from "./crash.slice";
import modalReducer from "./modal.slice";
import messageReducer from "./message.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crash: crashReducer,
    modal: modalReducer,
    message: messageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
