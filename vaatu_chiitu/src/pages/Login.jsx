import { NavLink } from "react-router-dom";
import login from "../assets/Login.svg";
import logo_vertical from "../assets/logo_vertical.svg";
import useLogin from "../hooks/useLogin";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginFN } = useLogin();

  const handleSubmit = async (e) => {
  	e.preventDefault();
  	await loginFN(username, password);
  };

  return (
    <div className=" flex w-screen h-screen bg-white">
      <div className=" relative w-[64%] items-center bg-black">
        <img
          src={login}
          className=" h-full scale-x-125 absolute right-[103px]"
        />
      </div>

      <div className=" flex-col w-[36%] mx-auto">
        <img src={logo_vertical} className=" mt-16 mx-auto" />

        <p className=" text-[#525252] nunito-sans700 text-[34px] mt-8 ml-[19%]">
          Login to your Account
        </p>
        <p className=" text-[#525252] nunito-sans400 text-[15px] ml-[19%]">
          Your friends are waiting to chat with you
        </p>

        <form className=" relative flex-col w-[80%] mt-8 ml-[10%]" onSubmit={handleSubmit}>
          <p className=" nunito-sans600 text-[15px] text-black">Username</p>
          <input
            type="text"
            className="nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 text-slate-600"
            placeholder="TAB033"
            value={username}
			onChange={(e) => setUsername(e.target.value)}
          />

          <p className=" nunito-sans600 text-[15px] text-black mt-5">
            Password
          </p>
          <input
            type="password"
            className="nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3  text-slate-600"
            placeholder="***************"
            value={password}
			onChange={(e) => setPassword(e.target.value)}
          />

          <p className=" text-[#468CF7] nunito-sans600 text-[12px] absolute right-0 hover:cursor-pointer mt-1">
            <NavLink to="/forgetpassword">Forgot Password?</NavLink>
          </p>

          <button
            type="submit"
            className=" bg-[#468CF7] py-2 items-center nunito-sans700 text-white rounded-md w-full text-[17px] mt-14"
          >
            Login
          </button>
        </form>

        <p className="nunito-sans700 text-[12px] text-[#525252] mt-4 ml-[36%]">
          Don’t have account?{" "}
          <span className=" text-[#468CF7] hover:cursor-pointer">
            <NavLink to="/signup">Signup</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
