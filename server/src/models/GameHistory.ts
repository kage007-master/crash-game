import { model, Schema } from "mongoose";

export interface GameHistory {
  cashPoint: Number;
  hash: String;
  time: Date;
}

const ModelSchema = new Schema({
  cashPoint: { type: Number, require: true },
  hash: { type: String, required: true },
  time: { type: Date, default: new Date() },
});

const Model = model("game_history", ModelSchema);
export default Model;
