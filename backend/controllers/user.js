import FriendRequest from "../model/friendRequestSchema.js";
import User from "../model/user.js";
import Conversation from "../model/conversation.js"
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import Otp from "../model/otp.js";
import {logger} from "../utils/logger.js";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password, confirmPassword) => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message:
        "Password should have at least 8 characters, one digit, one special character, one uppercase letter, and one lowercase letter",
    };
  }
  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match" };
  }

  return { isValid: true, message: "Password is valid" };
};
//-------------------------------------USER REGISTRATION---------------

export const FriendOfUser = async (req, res) => {
  try {
    console.log("in sidebar/friends");
    const userId = req.user._id;
    console.log("username : ", req.user.username);
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendList = user.friendList;
    console.log(friendList);

    const friendsData = [];

    for (const friend of friendList) {
      const friendData = await User.findById(friend.userId).select("-password");
      if (friendData) {
        const conversation = await Conversation.findOne({
          participants: { $all: [userId, friend.userId] }
        }).sort({ createdAt: -1 }).populate('lastMessage.senderId');
        
        let lastMessage = null;
        if (conversation && conversation.lastMessage) {
          lastMessage = {
            message: conversation.lastMessage.message,
            senderId: conversation.lastMessage.senderId._id
          };
        }

        friendsData.push({
          friendId: friendData._id,
          username: friendData.username,
          fullname: friendData.fullname,
          profilePic: friendData.profilePic,
          lastMessage: lastMessage,
          bio:friendData.bio

        });
      }
    }

    console.log(friendsData)

    return res.status(200).json(friendsData);
  } catch (error) {
    console.log("Error in user.js/controllers:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// for req friend search
export const searchUserByUsername = async (req, res) => {
  try {
    console.log("started")
    const { username } = req.body;
    console.log(username)
    console.log(req.body)
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "No user with this username" });
    }
    if (username === req.user.username) {
      return res.status(403).json({ message: "this user name is yours :)" });
    }

    const isFriend = req.user.friendList.some(
      (friend) => friend.userId.toString() === user._id.toString()
    );
    if (isFriend) {
      return res
        .status(400)
        .json({ message: "User is already in your friend list" });
    }

    const responseData = {
      id: user._id,
      profilePic: user.profilePic,
      nameOfUser: username,
    };

    return res.status(200).json({
      message: `User Has Been Found`,
      responseData,
    });
  } catch (error) {
    console.log("Error In searchUserByUsername Function (user.js/controllers)");
    return res.status(500).json({ message: "Server error" });
  }
};

// for friend sidebar

export const searchInSidebar = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "No user with this username" });
    }
    if (username === req.user.username) {
      return res.status(403).json({ message: "this user name is yours :)" });
    }
    const isFriend = req.user.friendList.some(
      (friend) => friend.userId.toString() === user._id.toString()
    );
    if (!isFriend) {
      return res
        .status(400)
        .json({ message: "User is Not in your friend list" });
    }
    const responseData = {
      id: user._id,
      profilePic: user.profilePic,
      nameOfUser: username,
    };

    return res.status(200).json({
      message: `User Has Been Found :- MainUser=${req.user._id} MainUserName=${req.user.username}  `,
      responseData,
    });
  } catch (error) {
    console.log("error in serach sidebar");
    return res.status(500).json({ message: "server error" });
  }
};

// export const getASingleUser = async (req, res) => {
//   try {
//     const { friendUserId } = req.params; // Updated to get friend's user ID from the URL parameters
//     const userId = req.user._id;

//     // Check if the friend user exists
//     const friendUser = await User.findById(friendUserId);
//     if (!friendUser) {
//       return res.status(404).json({ message: "Friend user not found." });
//     }

//     // Check if the user is already in the friendList
//     const isAlreadyFriend = friendUser.friendList.includes(userId);

//     if (isAlreadyFriend) {
//       return res
//         .status(400)
//         .json({ message: "User is already in the friendList." });
//     }

//     await User.updateOne(
//       { _id: userId },
//       { $addToSet: { friendList: friendUserId } }
//     );

//     // Add current user to the friendList of the friend user being added
//     await User.updateOne(
//       { _id: friendUserId },
//       { $addToSet: { friendList: userId } }
//     );

//     return res.status(200).json({
//       message: `User added to friendList successfully. FriendUserID:${friendUserId}  MainUserID:${userId}`,
//     });
//   } catch (error) {
//     console.log("Error in addFriend function: ", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

/// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const sendRequest = async (req, res) => {
  try {
    const { friendUserId } = req.params;
    const mainUser = req.user;

    if (!mainUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("both user's ids : " , friendUserId , " " , mainUser._id)

    if (friendUserId === mainUser._id.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot send friend request to yourself" });
    }

    const friendUser = await User.findById(friendUserId);
    console.log("friend user : ", friendUser);
    if (!friendUser) {
      return res.status(404).json({ message: "No such user found!" });
    }

    const isAlreadyFriend = friendUser.friendList.some(
      (friend) => friend.friendId.toString() === mainUser._id.toString()
    );
    if (isAlreadyFriend) {
      return res
        .status(400)
        .json({ message: "User is already in the friendList." });
    }

    // const existingRequest =
    //   mainUser.friendRequestsSent &&
    //   mainUser.friendRequestsSent.find(
    //     (request) =>
    //       request.receiverId.toString() === friendUserId &&
    //       request.status === "pending"
    //   );

      const existingRequest = await FriendRequest.findOne({
        senderId: mainUser._id,
       receiverId: friendUserId
      })
    
    console.log("exe req : " , existingRequest)

    if (existingRequest) {
      console.log("entered")
      return res
        .status(409)
        .json({ message: `Request already sent | Req Status : Pending` });
    }
    console.log("out")
    const frndReq = new FriendRequest({
      senderId: mainUser._id,
      receiverId: friendUserId,
      status: "pending",
    });

    console.log("Main user friendRequestsSent:", mainUser.friendRequestsSent);

    if (!mainUser.friendRequestsSent) {
      mainUser.friendRequestsSent = [];
    }

    await frndReq.save();
    mainUser.friendRequestsSent.push(frndReq._id);
    await mainUser.save();

    friendUser.friendRequestsReceived.push(frndReq._id);
    await friendUser.save();

    return res.status(200).json({
      message: `Friend Request Has Been Sent To The User Successfully`,
    });
  } catch (error) {
    console.log("Error in sendRequest controller: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
/// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const acceptRequest = async (req, res) => {
  try {
    const { friendUserId } = req.params;
    const mainUser = req.user;

    console.log(mainUser._id.toString(), friendUserId);

    const friendRequest = await FriendRequest.findOne({
      senderId: friendUserId,
      receiverId: mainUser._id.toString(),
      status: "pending",
    });

    console.log(friendRequest);

    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found or already accepted.",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    const senderUser = await User.findById(friendUserId);

    mainUser.friendList.push({
      userId: senderUser._id,
      username: senderUser.username,
      fullname: senderUser.fullname,
      profilePic: senderUser.profilePic,
    });

    senderUser.friendList.push({
      userId: mainUser._id,
      username: mainUser.username,
      fullname: mainUser.fullname,
      profilePic: mainUser.profilePic,
    });

    console.log(mainUser.friendRequestsReceived);
    console.log(senderUser.friendRequestsSent);

    mainUser.friendRequestsReceived = mainUser.friendRequestsReceived.filter(
      (request) => request.toString() !== friendRequest._id.toString()
    );
    senderUser.friendRequestsSent = senderUser.friendRequestsSent.filter(
      (request) => request.toString() !== friendRequest._id.toString()
    );

    await mainUser.save();
    await senderUser.save();

    return res.status(200).json({
      message: "Friend request accepted successfully.",
      senderId: friendUserId,
    });
  } catch (error) {
    console.log("Error in acceptRequest controller: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
/// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const rejectRequest = async (req, res) => {
  try {
    const { friendUserId } = req.params;
    const mainUser = req.user;

    const friendRequest = await FriendRequest.findOne({
      senderId: friendUserId,
      receiverId: mainUser._id.toString(),
      status: "pending",
    });

    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found or already accepted.",
      });
    }

    friendRequest.status = "rejected";
    await friendRequest.save();

    const senderUser = await User.findById(friendUserId);

    mainUser.friendRequestsReceived = mainUser.friendRequestsReceived.filter(
      (request) => request.toString() !== friendRequest._id.toString()
    );
    senderUser.friendRequestsSent = senderUser.friendRequestsSent.filter(
      (request) => request.toString() !== friendRequest._id.toString()
    );

    await mainUser.save();
    await senderUser.save();

    return res.status(200).json({
      message: "Friend request rejected successfully.",
      senderId: friendUserId,
    });
  } catch (error) {
    console.log("Error in rejectReq controller: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
/// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const otpDoc = await Otp.findOne({
      email: req.user.email,
      reason: "Verification",
    });

    if (!otpDoc) {
      return res.status(404).json({ message: "OTP not found" });
    }

    if (otpDoc.otp !== otp) {
      logger.warn(`OTP verification failed - Email: ${req.user.email}`);
      return res.status(401).json({ message: "Invalid OTP" });
    }

    await User.updateOne({ email: req.user.email }, { verified: true });

    const user = await User.findOne({ email: req.user.email });
    await otpDoc.deleteOne();

    logger.success(`OTP verification success - Email: ${req.user.email}`);
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("Error in verifyOtp:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// will trigerd on while user click on send otp  button on other page after entering email
export const sendOtpForForgotPass = async (req, res) => {
  try {
    const { email } = req.body;

    if (email === "" || !validateEmail(email)) {
      return res.status(400).json({
        message: "email is empty",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    // Save OTP to the database
    const otpDocument = new Otp({
      email: email,
      otp: otp,
      reason: "Password",
    });
    await otpDocument.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            /* Custom glass morphism effect */
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(to bottom, black, gray);
            }
    
            .glass {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                padding: 2rem;
                max-width: 400px;
                text-align: center;
            }
    
            /* Add shadow to heading */
            .shadow-heading {
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            }
    
            /* Text color and font size */
            h1 {
                color: #9f7aea;
                font-size: 2rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }
    
            p {
                color: #fff;
                font-size: 0.875rem;
                margin-bottom: 0.75rem;
            }
    
            .otp {
                color: #9f7aea;
                font-size: 1.125rem;
                font-weight: 900; /* Extra bold */
            }
        </style>
    </head>
    <body>
        <div class="glass">
            <h1 class="shadow-heading">Greetings Of The Day From VaatuChitu</h1>
            <p>Here is Your Code For Resetting Password : <span class="otp">${otp}</span></p>
        </div>
    </body>
    </html>    
  `;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP for updating Password",
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email has been sent" });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Failed to send otp for password" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword, confirmPassword } = req.body;

    const otpDocument = await Otp.findOne({
      otp: otp,
      reason: "Password",
    });

    if (!otpDocument) {
      return res.status(404).json({ message: "OTP not found" });
    }

    // Check if OTP matches
    if (otpDocument.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // Check if new password and confirm password match
    const passwordValidationResult = validatePassword(
      newPassword,
      confirmPassword
    );
    if (!passwordValidationResult.isValid) {
      return res
        .status(401)
        .json({ message: passwordValidationResult.message });
    }
    const user = await User.findOne({ email: otpDocument.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    // Delete the OTP document
    await otpDocument.deleteOne();

    // Respond with success message
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

// Edit Profile :

export const editProfile = async (req, res) => {
  try {
    const { userName, fullName, bio, gender, newPassword, confirmPassword } =
      req.body;

    if (
      userName === "" ||
      fullName === "" ||
      bio === "" ||
      gender === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      return res.status(400).send("All fields should be filled.");
    }

    const user = await User.findOne({ username: userName });

    if (!user || req.user.username === userName) {
      const passwordValidationResult = validatePassword(
        newPassword,
        confirmPassword
      );
      if (!passwordValidationResult.isValid) {
        return res
          .status(401)
          .json({ message: passwordValidationResult.message });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;

      user.username = userName;
      user.fullname = fullName;
      user.bio = bio;
      user.gender = gender;

      await user.save();

      return res.status(200).json({ message: "User has been updated." });
    } else {
      return res.status(409).json({ message: "Username is already taken." });
    }
  } catch (error) {
    console.error("Error in edit profile:", error);
    return res.status(500).send("Server Error");
  }
};

// -------------
export const pendingReq = async (req, res) => {
  try {
    const userId = req.params.id; 
    console.log("started")
    
    const friendRequests = await FriendRequest.find({ receiverId: userId });

    const senderIds = friendRequests.map(request => request.senderId);

    const senders = await User.find({ _id: { $in: senderIds } }, 'username profilePic');

    // Construct the result array
    const result = senders.map(sender => ({
      id: sender._id,
      username: sender.username,
      profilePic: sender.profilePic,
    }));

    console.log("ended")
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error in fetching pending requests", error);
    return res.status(500).json({ error: "Error in fetching pending requests" });
  }
};