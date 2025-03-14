import Conversation from "../model/conversation.js";
import Message from "../model/message.js";
import User from "../model/user.js";
import { logger } from "../utils/logger.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let { img } = req.body;

    const senderUser = await User.findById(senderId).populate("friendList");

    if (!senderUser) {
      return res.status(404).json({ message: "Sender user not found" });
    }

    const receiverUser = await User.findById(receiverId);
    if (!receiverUser) {
      return res.status(404).json({ message: "Receiver user not found" });
    }

    const receiverInFriendList = senderUser.friendList.some(
      (friend) => friend.userId.toString() === receiverId
    );

    if (!receiverInFriendList) {
      return res.status(403).json({
        message: "Receiver is not in the friend list.",
        senderId: senderId,
        receiverId: receiverId,
      });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    // if (img) {
    // 	const uploadedResponse = await cloudinary.uploader.upload(img);
    // 	img = uploadedResponse.secure_url;
    // }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
      img: img || "",
    });

    conversation.messages.push(newMessage._id);

    conversation.lastMessage = {
      message: message,
      senderId: senderId,
    };

    logger.info(`Message sent from ${senderId} to ${receiverId}`);

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// for getting all the messages of one user with a perticuler user
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id; // user id
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({
        error: "conversation not found",
      });
    }
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("ERROR IN GETMESSAGES CONTROLLERS/MESSAGE.JS");
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.user._id;
  } catch (error) {
    console.log("ERROR IN GETCONVERSATION CONTROLLER");
    return res.status(400).send(`Error: ${error.message}`);
  }
};
