import { ReactComponent as BTC } from "app/assets/svg/BTC.svg";
import { ReactComponent as ETH } from "app/assets/svg/ETH.svg";
import { ReactComponent as LTC } from "app/assets/svg/LTC.svg";
import { ReactComponent as EGLD } from "app/assets/svg/EGLD.svg";
import { ReactComponent as KAS } from "app/assets/svg/KAS.svg";
import { ReactComponent as ERG } from "app/assets/svg/ERG.svg";
import { ReactComponent as XRP } from "app/assets/svg/XRP.svg";
import { ReactComponent as BNB } from "app/assets/svg/BNB.svg";
import { ReactComponent as USDC } from "app/assets/svg/USDC.svg";
import { ReactComponent as USDT } from "app/assets/svg/USDT.svg";
import { ReactComponent as MATIC } from "app/assets/svg/MATIC.svg";
import { ReactComponent as ADA } from "app/assets/svg/ADA.svg";
import { ReactComponent as SOL } from "app/assets/svg/SOL.svg";
import { ReactComponent as EBONE } from "app/assets/svg/EBONE.svg";

export const initAvatar =
  "https://upcdn.io/W142hJk/image/demo/4mTLJiq7Ke.png?w=600&h=600&fit=max&q=70";

type CoinSVGType = {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const coins = [
  "btc",
  "eth",
  "ltc",
  "egld",
  // "kas",
  // "erg",
  "xrp",
  "bnb",
  "usdc",
  "usdt",
  "matic",
  "ada",
  "sol",
  "ebone",
];

export const coinSVG: CoinSVGType = {
  btc: BTC,
  eth: ETH,
  ltc: LTC,
  egld: EGLD,
  kas: KAS,
  erg: ERG,
  xrp: XRP,
  bnb: BNB,
  usdc: USDC,
  usdt: USDT,
  matic: MATIC,
  ada: ADA,
  sol: SOL,
  ebone: EBONE,
};

export const networks = {
  btc: ["bitcoin"],
  eth: ["ether", "bsc"],
  bnb: ["ether", "bsc"],
  matic: ["ether", "bsc", "polygon"],
  usdt: ["ether", "bsc", "polygon", "solana", "tron"],
  usdc: ["ether", "bsc", "polygon", "solana", "tron"],
  egld: ["mvx"],
  ebone: ["mvx"],
  kas: ["kaspa"],
  erg: ["ergo"],
  sol: ["solana"],
  ada: ["cardano", "bsc"],
  ltc: ["litecoin", "bsc"],
  xrp: ["ripple", "bsc"],
};

export const limits: Record<TCoin, any> = {
  btc: { bitcoin: 0.0021 },
  eth: { ether: 0.025, bsc: 0.012 },
  bnb: { ether: 0.125, bsc: 0.11 },
  matic: { ether: 60, bsc: 30, polygon: 30 },
  usdt: { ether: 48, bsc: 24, polygon: 24, solana: 24, tron: 24 },
  usdc: { ether: 48, bsc: 24, polygon: 24, solana: 24, tron: 24 },
  egld: { mvx: 1.25 },
  ebone: { mvx: 22 },
  sol: { solana: 1.1 },
  ada: { cardano: 21, bsc: 21 },
  ltc: { litecoin: 0.25, bsc: 0.25 },
  xrp: { litecoin: 11, bsc: 11 },
  erg: { ergo: 1 },
  kas: { kaspa: 1 },
};

export const fees: Record<TCoin, any> = {
  btc: { bitcoin: 0.0001 },
  eth: { ether: 0.005, bsc: 0.002 },
  bnb: { ether: 0.025, bsc: 0.01 },
  matic: { ether: 10, bsc: 5, polygon: 5 },
  usdt: { ether: 8, bsc: 4, polygon: 4, solana: 4, tron: 4 },
  usdc: { ether: 8, bsc: 4, polygon: 4, solana: 4, tron: 4 },
  egld: { mvx: 0.05 },
  ebone: { mvx: 2 },
  sol: { solana: 0.1 },
  ada: { cardano: 1, bsc: 1 },
  ltc: { litecoin: 0.05, bsc: 0.05 },
  xrp: { litecoin: 1, bsc: 1 },
  erg: { ergo: 1 },
  kas: { kaspa: 1 },
};

export const networkNames = {
  bitcoin: "Segwit",
  ether: "Ethereum",
  bsc: "BNB Smart Chain",
  polygon: "Polygon",
  tron: "Tron",
  solana: "Solana",
  kaspa: "Kaspa",
  cardano: "Cardano",
  ergo: "Ergo",
  ripple: "Ripple",
  mvx: "MultiversX",
  litecoin: "Litecoin",
};
