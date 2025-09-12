import User from "../models/User.js";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js"
//Middleware for routes protection

export const protectRoute = async (req, res, next) => {

  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.json({success: false, message: "User not Found"});

    req.user = user;
    next();
  } catch (error) {
    logger.error(error.message, { stack: error.stack, route: req.originalUrl });
    res.json({success: false, message: error.message});
  }
}