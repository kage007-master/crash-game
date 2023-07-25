import { f } from "../utils/timeConverter";
import GameHistoryModel from "../models/GameHistory";
import BetHistoryModel from "../models/BetHistory";
import UserModel, { User } from "../models/User";

interface Player {
  address: string;
  name: string;
  avatar: string;
  cashPoint: number;
  betAmount: number;
  chain: string;
  bonus?: number;
}

var timeElapsed = 0;
var isRising = false;
var crashTimeElapsed = 0;
var GameID = "";
var players: Player[] = [];
var waitings: Player[] = [];
let totalBet = 0;
let remain = 0;

export const startNewRound = (io: any) => {
  players = waitings;
  totalBet = 0;
  players.map(async (player: Player) => {
    let user: any = await UserModel.findOne({ address: player.address });
    if (user && user.balance) {
      user.balance[player.chain] -= player.betAmount;
      user.balance[player.chain] = Number(
        user.balance[player.chain].toFixed(8)
      );
      totalBet += player.betAmount;
      user.save();
    }
  });
  waitings = [];
  isRising = true;
  timeElapsed = 0;
  let timerId = setInterval(() => {
    if (isRising && timeElapsed > 5 && Math.random() < 0.005) {
      isRising = false;
      crashTimeElapsed = 0;
      var newGame = new GameHistoryModel({
        crashPoint: f(timeElapsed),
        hash: "123",
        time: new Date(),
      });
      newGame.save();
      GameID = String(newGame._id);
      players.map((player) => {
        var history = new BetHistoryModel({
          gameID: newGame._id,
          address: player.address,
          betAmount: player.betAmount,
          chain: player.chain,
          cashPoint: player.cashPoint,
          bonus: player.bonus,
          time: new Date(),
        });
        history.save();
      });
    } else if (isRising) {
      timeElapsed += 0.05;
    } else {
      crashTimeElapsed += 2;
      // start a new round
      if (crashTimeElapsed >= 120) {
        clearInterval(timerId);
        startNewRound(io);
      }
    }
    io.emit("stateInfo", {
      gameState: getTimeState(),
      playerState: getPlayers(),
      waitingState: getWaitings(),
    });
  }, 50);
};

export const getTimeState = () => {
  return {
    timeElapsed,
    isRising,
    GameID,
    crashTimeElapsed,
  };
};
export const getPlayers = () => {
  return players;
};
export const getWaitings = () => {
  return waitings;
};
export const addPlayer = async (player: Player) => {
  if (
    players.find((item) => {
      return item.address === player.address;
    })
  )
    return false;
  players.push({ ...player, bonus: 0 });
  let user: any = await UserModel.findOne({ address: player.address });
  if (user && user.balance) {
    user.balance[player.chain] -= player.betAmount;
    user.balance[player.chain] = Number(user.balance[player.chain].toFixed(8));
    user.save();
  }
  return true;
};

export const Cashout = async (address: string, time: number) => {
  let me = players.find((item) => {
    return item.address === address;
  });
  if (!me) return false;
  if (me.cashPoint > 0) return false;
  if (time > timeElapsed) return false;
  me.cashPoint = f(time);
  let user: any = await UserModel.findOne({ address: address });
  if (user && user.balance) {
    user.balance[me.chain] += Number((me.betAmount * me.cashPoint).toFixed(8));
    user.balance[me.chain] = Number(user.balance[me.chain].toFixed(8));
  }
  user.save();
  return true;
};

export const addWaiting = (player: Player) => {
  if (
    waitings.find((item) => {
      return item.address === player.address;
    })
  )
    return false;
  waitings.push({ ...player, bonus: 0 });
  return true;
};

export const removeWaitiong = (address: string) => {
  waitings = waitings.filter((item) => {
    return item.address !== address;
  });
  return true;
};
