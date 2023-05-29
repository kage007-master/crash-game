import express from "express";
import authController, { authValidation } from "../controllers/auth.controller";
import crashController from "../controllers/crash.controller";
import authMiddleware from "../middlewares/auth";

const router = express.Router();
router.post("/auth/login", authValidation.login, authController.login); // address
router.post("/auth/register", authValidation.register, authController.register); //  address, name, avatar
router.get("/auth/users", authController.users);
router.get("/mybet", authMiddleware, crashController.getMyBet);
router.get("/history", crashController.getHistory);

export default router;
