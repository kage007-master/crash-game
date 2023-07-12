import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { constStates } from "../config/const";
import axios from "app/components/axios";

const initialState: CrashState = {
  gameState: {
    timeElapsed: 0,
    isRising: false,
    GameID: "",
    crashTimeElapsed: 0,
  },
  playerState: [],
  waitingState: [],
  history: [],
  mybets: [],
};

export const getmybet = createAsyncThunk("getmybet", async () => {
  const res = await axios.get("/mybet");
  return res.data;
});

export const gethistory = createAsyncThunk("gethistory", async () => {
  const res = await axios.get("/history");
  return res.data;
});

export const crashSlicer = createSlice({
  name: "crash",
  initialState,
  reducers: {
    setGameState: (state, action) => {
      state.gameState = action.payload.gameState;
      state.playerState = action.payload.playerState;
      state.waitingState = action.payload.waitingState;
    },
    addMyBet: (state, action: PayloadAction<Bet>) => {
      state.mybets.unshift(action.payload);
      state.history.splice(10, 1);
    },
    addHistory: (state, action: PayloadAction<Game>) => {
      state.history.unshift(action.payload);
      state.history.splice(10, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getmybet.pending, (state, action) => {});
    builder.addCase(
      getmybet.fulfilled,
      (state, action: PayloadAction<Bet[]>) => {
        state.mybets = action.payload;
      }
    );
    builder.addCase(getmybet.rejected, (state, action) => {});
    builder.addCase(gethistory.pending, (state, action) => {});
    builder.addCase(
      gethistory.fulfilled,
      (state, action: PayloadAction<Game[]>) => {
        state.history = action.payload;
      }
    );
    builder.addCase(gethistory.rejected, (state, action) => {});
  },
});

export const { setGameState, addMyBet, addHistory } = crashSlicer.actions;

export default crashSlicer.reducer;
