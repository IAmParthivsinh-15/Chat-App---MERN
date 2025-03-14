import express from "express";
import {
  searchUserByUsername,
  sendRequest,
  acceptRequest,
  rejectRequest,
  verifyOtp,
  FriendOfUser,
  resetPassword,
  sendOtpForForgotPass,
  editProfile,
  searchInSidebar,
  pendingReq,
} from "../controllers/user.js";
import protectRoutes from "../middleware/protectRoutes.js";

const router = express.Router();

// GET
// router.get("/", protectRoutes, getAllUser);
router.get("/searchInSidebar", protectRoutes, searchInSidebar);
router.get("/FriendsOfUser", protectRoutes, FriendOfUser);
router.get("/allpendingrequests/:id" , protectRoutes , pendingReq)

// POST
// router.post("/addfriend", protectRoutes, getASingleUser);
// router.post("/addfriend/:friendUserId", protectRoutes, getASingleUser);
router.post("/searchuser", protectRoutes, searchUserByUsername);
router.post("/sendrequest/:friendUserId", protectRoutes, sendRequest);
router.post("/acceptrequest/:friendUserId", protectRoutes, acceptRequest);
router.post("/rejectrequest/:friendUserId", protectRoutes, rejectRequest);
// PATCH
router.patch("/verifyotp", protectRoutes, verifyOtp);
router.patch("/otpforUpPass", sendOtpForForgotPass);
router.patch("/resetpassword", resetPassword);
router.patch("/updateProfile", protectRoutes, editProfile);

export default router;
