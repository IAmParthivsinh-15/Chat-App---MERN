import { useState, useRef } from "react";
import SignUp from "../assets/SignUp.svg";
import logo_vertical from "../assets/logo_vertical.svg";
import { MdAddToPhotos } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useProfileImg from "../hooks/useProfileImg";
import useSignup from "../hooks/useSignup";
import { toast } from "react-toastify";
import useVerifyEmail from "../hooks/useVerifyEmail";
import { useAuthContext } from "../context/AuthContext";

// import { v2 as cloudinary } from 'cloudinary';

const Signup = () => {
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [inputs, SetInput] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePic: "",
  });

  const fileRef = useRef(null);
  const { setAuthUser } = useAuthContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetInput((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const { handleImgChange, profileImage } = useProfileImg();
  const { signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetInput((prevInputs) => ({
      ...prevInputs,
      profilePic: profileImage,
    }));
    try {
      try {
        const data = await signup(inputs);
        console.log("data in signup.jsx", data);
        setAuthUser(data);
        console.log(profilePic);
      } catch (error) {
        console.log("error in signup");
        toast.error(error.message);
      }
      console.log("Successfully signed up!");
      setVerifyOtp(true);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const { verifyEmail } = useVerifyEmail();

  const handleVerifyOTP = async () => {
    try {
      console.log(otp);
      await verifyEmail(otp);
      console.log("OTP verified!");
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  
  return (
    <div className=" flex w-screen h-screen bg-white">
      <div className=" relative w-[36%] items-center bg-black">
        <img src={SignUp} className=" h-full scale-x-110 absolute left-0" />
      </div>
      <div className=" w-[64%]">
        <img src={logo_vertical} className=" mt-6 mx-auto" />

        <p className=" text-[#525252] nunito-sans700 text-[34px] mt-6 ml-[32%]">
          Signup to your Account
        </p>
        <p className=" text-[#525252] nunito-sans400 text-[15px] ml-[37%]">
          Your friends are waiting to chat with you
        </p>

        <form
          className=" w-[70%] ml-[15%] flex-col gap-6 mt-4"
          onSubmit={handleSubmit}
        >
          <div class="relative overflow-hidden inline-block z-30 cursor-pointer mt-5">
            <input
              type="file"
              class="absolute text-transparent cursor-pointer text-sm z-20 w-full h-full opacity-0"
              id="pictureInput"
              ref={fileRef}
              onChange={handleImgChange}
            />
            <div className=" flex gap-3 cursor-pointer">
              <MdAddToPhotos className=" w-[32px] h-[32px] text-black opacity-80 z-10 cursor-pointer" />
              <label
                for="pictureInput"
                className=" nunito-sans600 text-[15px] text-black cursor-pointer inline-block py-1 z-10"
              >
                Add Profile Picture<span className=" text-[#E53131]">*</span>
              </label>
            </div>
          </div>

          <div className=" flex w-full gap-5 mt-5">
            <div className=" flex-col w-full">
              <p className=" nunito-sans600 text-[15px] text-black">
                Full Name<span className="text-[#E53131]">*</span>
              </p>
              <input
                type="text"
                className="nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 mt-1  text-slate-600"
                placeholder="Tirth Bhalodiya"
                value={inputs.fullname}
                onChange={(e) => {
                  SetInput({ ...inputs, fullname: e.target.value });
                }}
              />
            </div>

            <div className=" flex-col w-full">
              <p className=" nunito-sans600 text-[15px] text-black">
                User Name<span className="text-[#E53131]">*</span>
              </p>
              <input
                type="text"
                className="nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 mt-1  text-slate-600"
                placeholder="TAB033"
                value={inputs.username}
                onChange={(e) => {
                  SetInput({ ...inputs, username: e.target.value });
                }}
              />
            </div>
          </div>

          <div className=" flex w-full gap-5 mt-5">
            <div className=" flex-col w-full">
              <p className=" nunito-sans600 text-[15px] text-black">
                Gender<span className="text-[#E53131]">*</span>
              </p>
              <input
                id="radio2"
                type="radio"
                value="Male"
                name="gender"
                className=" scale-125 mt-3 ml-1"
                checked={inputs.gender === "Male"}
                onChange={handleChange}
              />
              <label
                className=" ml-5 nunito-sans700 text-[15px] text-black"
                for="radio"
              >
                Male
              </label>
              <input
                id="radio2"
                type="radio"
                value="Female"
                name="gender"
                className=" scale-125 ml-11"
                checked={inputs.gender === "Female"}
                onChange={handleChange}
              />
              <label
                for="radio"
                className=" ml-5 nunito-sans700 text-[15px] text-black"
              >
                Female
              </label>
            </div>

            <div className=" flex-col w-full">
              <p className=" nunito-sans600 text-[15px] text-black">
                Email<span className="text-[#E53131]">*</span>
              </p>
              <input
                type="email"
                name="email"
                className="nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 mt-1 text-slate-600"
                placeholder="mail@abc.com"
                value={inputs.email}
                onChange={(e) => {
                  SetInput({ ...inputs, email: e.target.value });
                }}
              />
            </div>
          </div>

          <div className=" flex w-full gap-5 mt-5">
            <div className=" flex-col w-full">
              <p className=" nunito-sans600 text-[15px] text-black">
                Create Password<span className="text-[#E53131]">*</span>
              </p>
              <input
                type="password"
                className="nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 mt-1  text-slate-600"
                placeholder="Create Password"
                value={inputs.password}
                onChange={(e) => {
                  SetInput({ ...inputs, password: e.target.value });
                }}
              />
            </div>

            <div className=" flex-col w-full">
              <p className=" nunito-sans600 text-[15px] text-black">
                Confirm Password<span className="text-[#E53131]">*</span>
              </p>
              <input
                type="text"
                className="nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 mt-1  text-slate-600"
                placeholder="Confirm Password"
                value={inputs.confirmPassword}
                onChange={(e) => {
                  SetInput({ ...inputs, confirmPassword: e.target.value });
                }}
              />
            </div>
          </div>

          {/* <button
            type="submit"
            className=" bg-[#468CF7] py-2 items-center nunito-sans700 text-white rounded-md w-1/2 text-[17px] mt-12 ml-[23%]"
          >
            Sign up
          </button> */}
          {verifyOtp ? (
            <div className="flex w-full gap-5 mt-5">
              <div className="flex-col w-full">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-[#468CF7] py-2 items-center nunito-sans700 text-white rounded-md w-1/2 text-[17px] mt-12 ml-[23%]"
                >
                  Sign up
                </button>
                <p className="nunito-sans600 text-[15px] text-black">
                  OTP<span className="text-[#E53131]">*</span>
                </p>
                <input
                  type="text"
                  className="nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 mt-1 text-slate-600"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={handleVerifyOTP}
                className="bg-[#468CF7] py-2 items-center nunito-sans700 text-white rounded-md w-1/2 text-[17px] mt-6 ml-[3%]"
              >
                Verify
              </button>
            </div>
          ) : (
            // <button
            //   type="submit"
            //   onClick={handleSubmit}
            //   className="bg-[#468CF7] py-2 items-center nunito-sans700 text-white rounded-md w-1/2 text-[17px] mt-12 ml-[23%]"
            // >
            //   Sign up
            // </button>
            <>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#468CF7] py-2 items-center nunito-sans700 text-white rounded-md w-1/2 text-[17px] mt-12 ml-[23%]"
              >
                Sign up
              </button>
            </>
          )}
        </form>

        <p className="nunito-sans700 text-[12px] text-[#525252] mt-4 ml-[40%]">
          Already have account?{" "}
          <span className=" text-[#468CF7] hover:cursor-pointer">
            <NavLink to="/">Login</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
