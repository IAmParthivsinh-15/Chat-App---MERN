import jwt from "jsonwebtoken";

const genTokenAndCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET
    // , {expiresIn: "150d",}
    );

    console.log("userId and Res " , userId)
    console.log("token in genToken : " , token)

   res.cookie("jwt", token, {
    // maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true, // only accessible through the HTTP protocol and not JS/Browser
    sameSite: "strict",
  });
  return token;
  // console.log("cooki.jwt : " , res.cookie('jwt'))
};

export default genTokenAndCookies;
