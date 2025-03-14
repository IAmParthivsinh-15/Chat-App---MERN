import jwt from "jsonwebtoken";
import User from "../model/user.js";

const protectRoutes = async (req, res, next) => {
  try {
    let token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies.jwt;


    if (!token) {
      return res
        .status(401)
        .send({ error: "Authentication Failed - Token Not Found" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      console.log("Verification failed");
      return res
        .status(401)
        .send({ error: "Authentication Failed - Invalid Token" });
    }

    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    
    req.user = user;
    req.userId = user?._id.toString();
    req.username = user?.username;

    next();
  } catch (error) {
    console.log("Error in authentication middleware ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default protectRoutes;
