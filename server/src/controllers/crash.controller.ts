import GameHistoryModel from "../models/GameHistory";
import BetHistoryModel from "../models/BetHistory";

const crashController = {
  getMyBet: async (req: any, res: any) => {
    const result: any = await BetHistoryModel.find({
      address: req.user.user.address,
    })
      .sort({ time: -1 })
      .limit(10);
    res.send(result);
  },
  getHistory: async (req: any, res: any) => {
    const result: any = await GameHistoryModel.find()
      .sort({ time: -1 })
      .limit(10);
    res.send(result);
  },
};

export default crashController;
