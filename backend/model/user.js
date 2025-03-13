import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "Hey There!! Let's Do Vaatu Chiitu :)",
    },
    friendRequestsSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
        default: [],
      },
    ],
    friendRequestsReceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
        default: [],
      },
    ],
    friendList: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        fullname: {
          type: String,
          required: true,
        },
        profilePic: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;