type TCoin =
  | "btc"
  | "eth"
  | "ltc"
  | "egld"
  | "kas"
  | "erg"
  | "xrp"
  | "bnb"
  | "usdc"
  | "usdt"
  | "matic"
  | "ada"
  | "sol"
  | "ebone";

interface Game {
  _id: string;
  crashPoint: number;
}

interface Bet {
  gameID: string;
  address?: string;
  betAmount: number;
  chain: string;
  cashPoint: number;
  bonus: number;
}

interface CrashState {
  gameState: {
    timeElapsed: number;
    isRising: boolean;
    GameID: string;
    crashTimeElapsed: number;
  };
  playerState: Player[];
  waitingState: [];
  history: Game[];
  mybets: Bet[];
}

interface Player {
  address: string;
  cashPoint: number;
  betAmount: number;
  bonus: number;
  chain: TCoin;
}

interface Message {
  text: string;
  address: string;
  name: string;
  avatar: string;
  time: Date;
}

type TNewtwork =
  | "bitcoin"
  | "ether"
  | "bsc"
  | "polygon"
  | "tron"
  | "solana"
  | "kaspa"
  | "ergo"
  | "ripple"
  | "litecoin"
  | "mvx"
  | "cardano";
