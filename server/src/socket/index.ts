import {
  getTimeState,
  startTimer,
  addPlayer,
  getPlayers,
  getWaitings,
  Cashout,
  addWaiting,
  removeWaitiong,
} from "./crashgame";
const socketProvider = (io: any) => {
  startTimer();
  io.on("connection", (socket: any) => {
    console.log("A user connected");
    var auth = {
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
      },
    };
    socket.emit("playerState", getPlayers());
    socket.emit("auth");
    socket.on("auth", (data: any) => {
      auth = data.auth;
    });
    socket.on("bet", (data: any) => {
      if (data.address !== auth.user.address || data.address === "") return;
      addPlayer({
        ...auth.user,
        cashPoint: 0,
        cashTime: 0,
        betAmount: data.amount,
        chain: data.chain,
      });
    });
    socket.on("promise", (data: any) => {
      if (data.address !== auth.user.address || data.address === "") return;
      addWaiting({
        ...auth.user,
        cashPoint: 0,
        cashTime: 0,
        betAmount: data.amount,
        chain: data.chain,
      });
    });
    socket.on("cancelPromise", (data: any) => {
      if (data.address !== auth.user.address || data.address === "") return;
      removeWaitiong(data.address);
    });
    socket.on("cashOut", (data: any) => {
      if (data.address !== auth.user.address || data.address === "") return;
      Cashout(data.address, data.time, data.point);
    });
    socket.on("message", (data: any) => {
      io.emit("message", {
        ...data,
        address: auth.user.address,
        avatar: auth.user.avatar,
        time: new Date(),
      });
    });
  });

  setInterval(() => {
    io.emit("stateInfo", {
      gameState: getTimeState(),
      playerState: getPlayers(),
      waitingState: getWaitings(),
    });
  }, 100);
};
export default socketProvider;
