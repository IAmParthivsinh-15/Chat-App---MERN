import jwt from "jsonwebtoken";
import User from "../model/user.js";

const protectRoutes = async (req, res, next) => {
  try {
    let token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.jwt;
    // console.log("authori",req.header("Authorization"))
    console.log("token : " , token )
    if (!token) {
      return res.status(401).send({
        error: "Authentication Failed - Token Not Found",
      });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      console.log("Verification failed");
      return res.status(401).send({
        error: "Authentication Failed  - Token Not Found",
      });
    }

    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in authentication middleware ", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export default protectRoutes;