import User from "../models/User.js";
import Message from "../models/Message.js";
import logger from "../utils/logger.js"
//Get all users except the logged in user

export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

    //Counter for msgs not seen
    const unseenMessages = {}
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})
      if(messages.length > 0){
        unseenMessages[user._id] = messages.length;
      }
    })
    await Promise.all(promises);
    res.json({success: true, users: filteredUsers, unseenMessages})
  } catch (error) {
    logger.error(error.message, { stack: error.stack, route: req.originalUrl })
    res.json({success: false, message: error.message})
  }
}

//Get all messages for selected user

export const getMessages = async (req, res) => {
  try {
    const {id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        {senderId: myId, receiverId: selectedUserId},
        {senderId: selectedUserId, receiverId: myId},
      ]
    })

    await Message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen: true});

    res.json({success: true, messages})

  } catch (error) {
    logger.error(error.message, { stack: error.stack, route: req.originalUrl })
    res.json({success: false, message: error.message})
  }
}


//API to mark msgs as seen/read using msg ID

export const markMessageAsSeen = async (req, res) => {

  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, {seen: true})
    res.json({success: true})
  } catch (error) {
    logger.error(error.message, { stack: error.stack, route: req.originalUrl })
    res.json({success: false, message: error.message})
  }
}