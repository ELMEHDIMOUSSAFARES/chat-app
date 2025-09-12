import mongoose from "mongoose";
import logger from "../utils/logger.js"
//Connecting to Mongo DB func

export const connectDB = async () => {
  try{

    mongoose.connection.on('connected', () => console.log('Database connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
  } catch(error){
    logger.error(error.message, { stack: error.stack, route: req.originalUrl })
  }
}