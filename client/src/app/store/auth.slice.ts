import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { socketEvents } from "../providers/socket";
import axios from "axios";

interface IState {
  token: string;
  user: {
    address: string;
    name: string;
    avatar: string;
    balance: Record<TCoin, number>;
    wallet: any;
  };
}

const initialState: IState = {
  token: "",
  user: {
    address: "",
    name: "",
    avatar: "",
    balance: {
      btc: 0,
      eth: 0,
      ltc: 0,
      egld: 0,
      kas: 0,
      erg: 0,
      xrp: 0,
      bnb: 0,
      usdc: 0,
      usdt: 0,
      matic: 0,
      ada: 0,
      sol: 0,
      ebone: 0,
    },
    wallet: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (state) => {
      state.token = initialState.token;
      state.user = initialState.user;
    },
    setAuth: (state, action: PayloadAction<IState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      axios.defaults.headers.common["x-auth-token"] = action.payload.token;
      socketEvents.emitAuth({ auth: state });
    },
    setBalance: (state, action: PayloadAction<any>) => {
      let chain: TCoin = action.payload.chain;
      state.user.balance[chain] += action.payload.amount;
      state.user.balance[chain] = Number(state.user.balance[chain].toFixed(8));
    },
  },
});

export const { setAuth, setLogout, setBalance } = authSlice.actions;

export default authSlice.reducer;
