import { useState } from "react";
import { NavLink } from "react-router-dom";
import login from '../assets/Login.svg'
import logo_vertical from '../assets/logo_vertical.svg'

const ForgetPassword = () => {

    const [otpSended, setOtpSended] = useState(false);

    function otpsendHandler(e){
        e.preventDefault();
        setOtpSended(true);
    }

    return(
        <div className=" flex w-screen h-screen bg-white">
            <div className=' relative w-[64%] items-center bg-black'>
                <img src={login} className=' h-full scale-x-125 absolute right-[103px]' />
            </div>

            <div className=' flex-col w-[36%] mx-auto' >
                <img src={logo_vertical} className=' mt-12 mx-auto'/>

                <p className=' text-[#525252] nunito-sans700 text-[34px] mt-8 ml-[30%]'>Reset Password</p>

                <form className=' relative flex-col w-[80%] mt-8 ml-[10%]' onSubmit={(e) => otpsendHandler(e)}>
                    <p className=' nunito-sans600 text-[15px] text-black'>Email</p>
                    <input type='email' className='nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 text-slate-600' placeholder='mail@abc.com'/>

                    { !otpSended &&
                        <button type='submit' className=' bg-[#468CF7] py-2 items-center nunito-sans700 text-white rounded-md w-full text-[17px] mt-6'>Send OTP</button>
                    }
                </form>
                {otpSended ? 
                (
                    <form className=' relative flex-col w-[80%] ml-[10%]'>
                        <p className=' nunito-sans600 text-[15px] text-black mt-5'>OTP</p>
                        <input type='text' className='nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 text-slate-600' placeholder='Enter OTP'/>

                        <p className=' nunito-sans600 text-[15px] text-black mt-5'>Create New Password</p>
                        <input type='password' className='nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 text-slate-600' placeholder='Create New Password'/>

                        <p className=' nunito-sans600 text-[15px] text-black mt-5'>Confirm Password</p>
                        <input type='text' className='nunito-sans400 bg-white border-2 border-solid w-full border-[#DED2D9] rounded-md py-1.5 px-3 text-slate-600' placeholder='Confirm Password'/>

                        <button type='submit' className=' bg-[#468CF7] py-2 items-center nunito-sans700 text-white rounded-md w-full text-[17px] mt-12'>Reset Password</button>
                    </form>
                ) : 
                (
                    <NavLink to='/'><button className=' border-2 border-slate-500 bg-slate-400 py-1 items-center nunito-sans700 text-white rounded-md w-3/12 ml-[10%] text-[17px] mt-3'>Back</button></NavLink>
                )
                }
            </div>
        </div>
    );
}

export default ForgetPassword;