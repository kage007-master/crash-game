import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import environment from "../config";
import { addHistory, addMyBet, setGameState } from "../store/crash.slice";
import { setBalance } from "app/store/auth.slice";
import { newMessage, setMessages } from "app/store/message.slice";
import { AppDispatch, RootState } from "app/store";
import { f } from "app/utils/util";

const socket: Socket = io(environment.socket);

export const socketEvents = {
  emitAuth: (data: any) => {
    socket.emit("auth", data);
  },
  emitBet: (data: any) => {
    if (data.amount > 0) socket.emit("bet", data);
  },
  emitPromise: (data: any) => {
    if (data.amount > 0) socket.emit("promise", data);
  },
  emitCancelPromise: (data: any) => {
    socket.emit("cancelPromise", data);
  },
  emitCashOut: (data: any) => {
    socket.emit("cashOut", data);
  },
  emitMessage: (message: string, name: string) => {
    if (message.length) socket.emit("message", { text: message, name });
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
        data.gameState.isRising &&
        data.gameState.timeElapsed <= 5.05 &&
        data.gameState.timeElapsed >= 5
      ) {
        let me = data.playerState.find((player: Player) => {
          return player.address === auth.user.address;
        });
        if (me)
          dispatch(
            setBalance({ chain: me.chain, amount: -Number(me.betAmount) })
          );
      }
      if (!data.gameState.isRising && data.gameState.crashTimeElapsed === 0) {
        dispatch(
          addHistory({
            _id: data.gameState.GameID,
            crashPoint: f(data.gameState.timeElapsed),
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
