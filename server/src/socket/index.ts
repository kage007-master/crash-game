import {
  getTimeState,
  addPlayer,
  getPlayers,
  getWaitings,
  Cashout,
  addWaiting,
  removeWaitiong,
  startNewRound,
} from "./crashgame";

interface Message {
  text: string;
  address: string;
  avatar: string;
  time: Date;
}

const messages: Message[] = [
  {
    text: "Ok. Ill wait",
    address: "bY3f1..12",
    avatar: "avatar/avatar2.png",
    time: new Date(),
  },
  {
    text: "Pellentesque vulputate placerat sem, semper risus sollicitudin vitae. Integereu dignissim eros, et dictum sem.",
    address: "bY3f1..12",
    avatar: "avatar/avatar1.png",
    time: new Date(),
  },
  {
    text: "Nam lobortis iaculis hendrerit.",
    address: "bY3f1..12",
    avatar: "avatar/avatar2.png",
    time: new Date(),
  },
  {
    text: "Pellentesque mi massa, commodo nonvelit ut, venenatis dapibus tellus.",
    address: "bY3f1..12",
    avatar: "avatar/avatar3.png",
    time: new Date(),
  },
  {
    text: "Fusce eget interdum massa, nongravida nisi. Donec eget orci sapienbibendum viverra nec in nisi.",
    address: "bY3f1..12",
    avatar: "avatar/avatar4.png",
    time: new Date(),
  },
  {
    text: "Suspendisse potenti.",
    address: "bY3f1..12",
    avatar: "avatar/avatar4.png",
    time: new Date(),
  },
  {
    text: "Curabitur non efficitur orci, sagittisplacerat lectus.",
    address: "bY3f1..12",
    avatar: "avatar/avatar3.png",
    time: new Date(),
  },
];

const socketProvider = (io: any) => {
  startNewRound(io);
  io.on("connection", (socket: any) => {
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
    socket.emit("messages", messages);
    socket.on("auth", (data: any) => {
      auth = data.auth;
      socket.emit("messages", messages);
    });
    socket.on("bet", (data: any) => {
      if (data.address !== auth.user.address || data.address === "") return;
      addPlayer({
        ...auth.user,
        cashPoint: 0,
        betAmount: data.amount,
        chain: data.chain,
      });
    });
    socket.on("promise", (data: any) => {
      if (data.address !== auth.user.address || data.address === "") return;
      addWaiting({
        ...auth.user,
        cashPoint: 0,
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
      Cashout(data.address, data.time);
    });
    socket.on("message", (data: any) => {
      const newMessage = {
        ...data,
        address: auth.user.address,
        avatar: auth.user.avatar,
        time: new Date(),
      };
      messages.push(newMessage);
      io.emit("message", newMessage);
    });
  });
};
export default socketProvider;
