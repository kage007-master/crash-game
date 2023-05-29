import { model, ObjectId, Schema } from "mongoose";

export interface BetHistory {
  gameID: ObjectId;
  address: string;
  betAmount: Number;
  chain: string;
  cashPoint: Number;
  bonus: Number;
  time: Date;
}

const ModelSchema = new Schema({
  gameID: { type: String, required: true },
  address: { type: String, required: true },
  betAmount: { type: Number, required: true },
  chain: { type: String, required: true },
  cashPoint: { type: Number, require: true },
  bonus: { type: Number, require: true },
  time: { type: Date, default: new Date() },
});

const Model = model("bet_history", ModelSchema);
export default Model;
