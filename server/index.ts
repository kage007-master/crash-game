import http from "http";
import https from "https";
import fs from "fs";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import SocketIO from "socket.io";

import router from "./src/routes";
import { connectDatabase } from "./src/configs/db";
import environment from "./src/configs";
import socketProvider from "./src/socket/index";

var app = express();
app.use(cors());
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const options = {
  key: fs.readFileSync("ssl/key.pem"),
  cert: fs.readFileSync("ssl/certificate.pem"),
};

const httpServer = https.createServer(options, app);
// const httpServer = new http.Server(app);
const io = new SocketIO.Server(httpServer, {
  cors: { methods: ["GET", "POST"] },
}).of("/crash");
socketProvider(io);
app.use("/", router);
connectDatabase();

const port = environment.port || 5000;
httpServer.listen(port, () => console.log(`Server started on ${port}`));
