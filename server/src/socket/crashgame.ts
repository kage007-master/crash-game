import { convertTime, convertPoint } from "../utils/timeConverter";
import GameHistoryModel from "../models/GameHistory";
import BetHistoryModel from "../models/BetHistory";
import UserModel, { User } from "../models/User";

const states = {
  crash: "CRASH",
  loading: "LOADING",
  playing: "PLAYING",
};

const loadingTime = 6;
const crashTime = 4;

interface Player {
  address: string;
  name: string;
  avatar: string;
  cashPoint: number;
  cashTime: number;
  betAmount: number;
  chain: string;
  bonus?: number;
}

var time = 0;
var state = states.loading;
var GameID = "";
var crash = 0;
var players: Player[] = [];
var waitings: Player[] = [];
var crashPoint = 14;

export const startTimer = () => {
  console.log("timer start");
  var timer = setInterval(() => {
    time += 0.1;
    if (state === states.loading && time > loadingTime)
      startGame(), (crashPoint = Math.floor(Math.random() * 20));
    else if (state === states.playing && time > crashPoint) finishGame();
    else if (state === states.crash && time > crashTime) initGame();
  }, 100);
};

const initGame = () => {
  players = waitings;
  waitings = [];
  state = states.loading;
  time = 0;
};

const startGame = () => {
  state = states.playing;
  time = 0;
  players.map(async (player: Player) => {
    let user: any = await UserModel.findOne({ address: player.address });
    if (user && user.balance) {
      user.balance[player.chain] -= player.betAmount;
      user.balance[player.chain] = Number(
        user.balance[player.chain].toFixed(8)
      );
      user.save();
    }
  });
};

const finishGame = () => {
  var newGame = new GameHistoryModel({
    cashPoint: convertPoint(crashPoint),
    hash: "123",
    time: new Date(),
  });
  newGame.save();
  GameID = String(newGame._id);
  crash = convertPoint(crashPoint);
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
  state = states.crash;
  time = 0;
};
export const getTimeState = () => {
  return {
    time: convertTime(time),
    state,
    point: convertPoint(time),
    GameID,
    crash,
  };
};
export const getPlayers = () => {
  return players;
};
export const getWaitings = () => {
  return waitings;
};
export const addPlayer = (player: Player) => {
  if (
    players.find((item) => {
      return item.address === player.address;
    })
  )
    return false;
  players.push({ ...player, bonus: 0 });
  return true;
};

export const Cashout = async (address: string, time: number, point: number) => {
  let me = players.find((item) => {
    return item.address === address;
  });
  if (!me) return false;
  if (me.cashPoint > 0) return false;
  if (point > crashPoint) return false;
  me.cashPoint = point;
  me.cashTime = time;
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
