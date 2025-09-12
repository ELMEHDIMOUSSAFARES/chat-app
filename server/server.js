import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from './lib/db.js'
import userRouter from "./routes/userRoutes.js";

const app = express();
const server = http.createServer(app);

app.use(express.json({limit: "4mb"}));
app.use(cors());

app.use("/api/status", (req, res)=> res.send("Server Is Live"));
app.use("/api/auth", userRouter);


//connect to mongoDB

await connectDB();

const PORT = process.env.PORT || 5000;
console.log("Port: " + PORT)