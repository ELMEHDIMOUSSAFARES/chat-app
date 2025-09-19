import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from './lib/db.js'
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

//Socket.io initialization
const corsOrigin = process.env.NODE_ENV === "production"
  ? "https://chat-app-one-fawn-79.vercel.app"  // production frontend URL
  : "*"; // dev

export const io = new Server(server, {
  cors: { origin: corsOrigin }
});
//Storing online users statuses
export const userSocketMap = {};

// Socket.io connection handler
io.on("connection", (socket)=>{
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  //Show online statuses to all online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", ()=>{
    console.log("User Disconnected", userId);
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })

});


app.use(express.json({limit: "4mb"}));
app.use(cors());

//routes
app.use("/api/status", (req, res)=> res.send("Server Is Live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

//connect to mongoDB

await connectDB();



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});