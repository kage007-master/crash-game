import { model, Schema } from "mongoose";

export interface User {
  address: string;
  name?: string;
  balance: string;
  avatarUrl?: string;
}

const ModelSchema = new Schema({
  address: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  balance: {
    btc: { type: Number, default: 0.0 },
    eth: { type: Number, default: 0.0 },
    ltc: { type: Number, default: 0.0 },
    egld: { type: Number, default: 0.0 },
    kas: { type: Number, default: 0.0 },
    erg: { type: Number, default: 0.0 },
    xrp: { type: Number, default: 0.0 },
    bnb: { type: Number, default: 0.0 },
    usdc: { type: Number, default: 0.0 },
    usdt: { type: Number, default: 0.0 },
    matic: { type: Number, default: 0.0 },
    ada: { type: Number, default: 0.0 },
    sol: { type: Number, default: 0.0 },
    ebone: { type: Number, default: 100.0 },
  },
  avatar: { type: String },
  role: { type: String, default: "user" },
});

const Model = model("User", ModelSchema);
export default Model;
