import bcrypt from "bcrypt";
import User from "../model/user.js";
import genTokenAndCookies from "../utils/genTokenAndCookies.js";
import Otp from "../model/otp.js";
import nodemailer from "nodemailer";
import { v2 as cloudinary } from 'cloudinary';


export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // console.log( emailRegex.test(email))
  return emailRegex.test(email);
};

const validatePassword = (password, confirmPassword) => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  console.log(password, " " , confirmPassword)
  if (!passwordRegex.test(password)) {
    // console.log()
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
  console.log("signing up");
  // console.log(req.body)
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

    let {profilePic} = req.body;
    // console.log("email : " , req.body.email)
    // console.log(req.body)

    console.log("profilepic started")
    if(!profilePic){
     return res.status(401).json({message:"please provide img"})
    }
    console.log("profilepic ended")

    console.log("cloudinary started")
    let result= ""
    try {
     result = await cloudinary?.uploader?.upload(profilePic);
    } catch (error) {
      console.log("error in result/cloudinary : " , error)
      return res.json({message:"error in uploading  image to clodinary",error});
    }
    console.log(`cloudinary uploaded : ${result}`);
    const profilePicUrl = result?.secure_url;
    console.log("cloudinary ended")


    // Validate email
    console.log("email validation started");
    if (!validateEmail(email)) {
      console.log("in email check")
      return res.status(401).json({ message: "Invalid email format" });
    }
    console.log("email vali ended")

    // Validate password
    console.log("pass validation started");
    
    const passwordValidationResult = validatePassword(
      password,
      confirmPassword
      );
      console.log("pass validation checking ended");
    if (!passwordValidationResult.isValid) {
      console.log(passwordValidationResult.isValid)
      return res
        .status(401)
        .json({ message: "Passwords do not match" });
    }
    console.log("pass validation ended");


    console.log(" Check if the user already exists")
    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({
        message: `User with this username : "${username}" , Already Exist`,
      });
    }
    
    const emailOfUser = await User.findOne({ email });
    if (emailOfUser && email !== "") {
      return res.status(422).json({message:"email is in use already "});
    }
    console.log(" Check if the user already exists ended")

    // New Added
    console.log("otp st")
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    // Save OTP to the database
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
    console.log("otp sent")


    //End
    console.log("salting st")
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("salting end")

    // Create a new user instance
    console.log("user creation st")

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: profilePicUrl,
      // bio
    });
    console.log("user creation done")


    // Save the user to the database
    // console.log("try block st")
    try {
      console.log("in try block st")
      await newUser.save();

      // Generate tokens and send the response
      console.log("gen cooki")
      const token=genTokenAndCookies(newUser._id, res);
      console.log("gen cooki ended ")

      // Send the user details in the response
      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message:"Now , Verify Your Email",
        token
        // bio : newUser.bio ;
      });
    } catch (error) {
      console.log("Error saving user:", error);
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log("Error in signup(auth.js/controller): ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const xyz = async (req , res)=>{
  try{

  }catch(err){
    
  }
}

/// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const login = async (req, res) => {
  try {
    console.log("started login")
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    console.log("user searching")
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    console.log("done")


    if (!user.verified) {
      return res.status(400).json({ message: "User is not verified" });
    }

    console.log("Pass verification")

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.password || ""
    );
    console.log("done")


    if (!isCorrectPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    console.log("authentication")

    const token = genTokenAndCookies(user._id, res);
    
    console.log("done")

    console.log("response")

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
      token,

    });

  } catch (error) {
    console.log("Error in login(auth.js/controller): ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: `user has been logout succesfully ` });
  } catch (error) {
    console.log("Error in Logout(auth.js/controller): ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
