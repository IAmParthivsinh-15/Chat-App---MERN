import bcrypt from "bcrypt";
import User from "../model/user.js";
import genTokenAndCookies from "../utils/genTokenAndCookies.js";
import Otp from "../model/otp.js";
import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password, confirmPassword) => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      error:
        "Password should have at least 8 characters, one digit, one special character, one uppercase letter, and one lowercase letter",
    };
  }
  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }

  return { isValid: true, message: "Password is valid" };
};

export const signup = async (req, res) => {
  try {
    const {
      fullname,
      username,
      email,
      password,
      confirmPassword,
      gender,
      // profilePic,
      // bio
    } = req.body;

    let { profilePic } = req.body;

    if (!profilePic) {
      return res.status(401).json({ message: "please provide img" });
    }

    // let result= ""
    // try {
    //  result = await cloudinary?.uploader?.upload(profilePic);
    // } catch (error) {
    //   console.log("error in result/cloudinary : " , error)
    //   return res.json({message:"error in uploading  image to clodinary",error});
    // }
    // console.log(`cloudinary uploaded : ${result}`);
    // const profilePicUrl = result?.secure_url;
    // console.log("cloudinary ended")

    if (!validateEmail(email)) {
      return res.status(401).json({ message: "Invalid email format" });
    }

    const passwordValidationResult = validatePassword(
      password,
      confirmPassword
    );
    if (!passwordValidationResult.isValid) {
      return res.status(401).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({
        message: `User with this username : "${username}" , Already Exist`,
      });
    }

    const emailOfUser = await User.findOne({ email });
    if (emailOfUser && email !== "") {
      return res.status(422).json({ message: "email is in use already " });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    const otpDocument = new Otp({
      email: email,
      otp: otp,
      reason: "Verification",
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
        <!-- Include Tailwind CSS via CDN -->
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
            /* Custom glass morphism effect */
            .glass {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.18);
            }
    
            /* Add shadow to heading */
            .shadow-heading {
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            }
        </style>
    </head>
    <body class="h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-800">
        <div class="glass text-white flex flex-col gap-8 justify-center items-center border-4 border-black w-full max-w-lg p-8">
            <h1 class="text-3xl font-bold text-center text-purple-400 tracking-wider shadow-heading">Greetings Of The Day From VaatuChitu.Com</h1>
            <p class="text-xs text-center">VaatuChitu.Com is a worldwide chatting app with 6M+ active users and is in the top-5 of the most popular social networking platforms.</p>
            <p class="text-center">Here is Your Code For Request Of Resetting The Password  : <span class="text-purple-500 font-semibold"> ${otp} </span></p>
        </div>
    </body>
    </html>
    
  `;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification Code for ChatApp",
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);

    //End
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic,
      // profilePic: profilePicUrl,
      // bio
    });

    try {
      await newUser.save();

      const token = genTokenAndCookies(newUser._id, res);

      logger.success(
        `Signup Success - UserId=${newUser._id} - Username=${username} [VERIFICATION PENDING]`
      );

      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: "Now , Verify Your Email",
        token,
        // bio : newUser.bio ;
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log("Error in signup(auth.js/controller): ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    logger.info(`Login attempt - Username: ${username}`);
    const user = await User.findOne({ username });

    if (!user) {
      logger.warn(`Login failed - User does not exist - Username: ${username}`);
      return res.status(400).json({ message: "User does not exist" });
    }

    if (!user.verified) {
      logger.warn(`Login failed - User not verified - Username: ${username}`);
      return res.status(400).json({ message: "User is not verified" });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.password || ""
    );

    if (!isCorrectPassword) {
      logger.warn(`Login failed - Incorrect password - Username: ${username}`);
      return res.status(400).json({ error: "Incorrect password" });
    }
    const token = genTokenAndCookies(user._id, res);

    logger.success(`Login success - UserId=${user._id} - Username=${username}`);

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
      token,
    });
  } catch (error) {
    logger.error(
      `Login error - Username=${req.body.username} - Error: ${error.message}`
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    logger.info(`Logout success - UserId=${req.userId}`);
    res.status(200).json({ message: `user has been logout succesfully ` });
  } catch (error) {
    console.log("Error in Logout(auth.js/controller): ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
