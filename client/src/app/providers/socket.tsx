import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import environment from "../config";
import { addHistory, addMyBet, setGameState } from "../store/crash.slice";
import { setBalance } from "app/store/auth.slice";
import { newMessage, setMessages } from "app/store/message.slice";
import { constStates } from "app/config/const";
import { AppDispatch, RootState } from "app/store";

const socket: Socket = io(environment.socket);

export const socketEvents = {
  emitAuth: (data: any) => {
    socket.emit("auth", data);
  },
  emitBet: (data: any) => {
    socket.emit("bet", data);
  },
  emitPromise: (data: any) => {
    socket.emit("promise", data);
  },
  emitCancelPromise: (data: any) => {
    socket.emit("cancelPromise", data);
  },
  emitCashOut: (data: any) => {
    socket.emit("cashOut", data);
  },
  emitMessage: (message: string) => {
    if (message.length) socket.emit("message", { text: message });
  },
};

const SocketProvider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    socket.on("auth", () => {
      socketEvents.emitAuth({ auth });
    });
    socket.on("stateInfo", (data: CrashState) => {
      dispatch(setGameState(data));
      if (
        data.gameState.state === constStates.playing &&
        data.gameState.time < 0.1
      ) {
        let me = data.playerState.find((player: Player) => {
          return player.address === auth.user.address;
        });
        if (me)
          dispatch(
            setBalance({ chain: me.chain, amount: Number(-me.betAmount) })
          );
      }
      if (
        data.gameState.state === constStates.crash &&
        data.gameState.time < 0.1
      ) {
        dispatch(
          addHistory({
            _id: data.gameState.GameID,
            cashPoint: data.gameState.crash,
          })
        );
        let me = data.playerState.find((player: Player) => {
          return player.address === auth.user.address;
        });
        if (me) {
          dispatch(
            addMyBet({
              gameID: data.gameState.GameID,
              chain: me.chain,
              betAmount: me.betAmount,
              cashPoint: me.cashPoint,
              bonus: me.bonus,
            })
          );
        }
      }
    });
    socket.on("message", (data) => {
      dispatch(newMessage(data));
    });
    socket.on("messages", (data: Message[]) => {
      dispatch(setMessages(data));
    });
    return () => {
      socket.off("auth");
      socket.off("stateInfo");
      socket.off("message");
      socket.off("messages");
    };
  }, [auth]);
  return <></>;
};

export default SocketProvider;
