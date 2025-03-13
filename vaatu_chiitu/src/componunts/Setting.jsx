import Arrow from '../assets/Arrow_drop_down_big.svg'

const Setting = ({user, setEditProfile}) => {
    return(
        <div className=" relative h-full bg-[#343434] w-[69.6934%] flex-col z-10">
            <div className=" flex mt-7 ml-3">
                <img src={Arrow} onClick={() => setEditProfile(false)} className=' cursor-pointer'/>
                <p className=' text-[28px] leading-[34px] inter600 text-white opacity-90 ml-1 tracking-wider'>Edit Profile</p>
            </div>

            <div className='relative w-[92%] py-3 pl-4 ease-in h-[85px] flex rounded-xl bg-[#4D4D4D] mt-5 ml-[4%] mr-[4%]'>
                <img src={user.profilePic} className=' rounded-full w-[55px] h-[55px] my-auto ml-2' />
                <div className=' flex flex-col pl-4 my-auto'>
                    <p className=' leading-[25px] text-[23px] inter600 text-[#FFFFFFE5] opacity-90 mt-1 tracking-[0.01em]'>
                        {user.username}
                    </p>
                    <p className=' leading-[19px] text-[14px] inter400 text-[#FFFFFFE5] opacity-80 ml-[0.5px] -tracking-[0.01em]'>
                        {user.fullname}
                    </p>
                </div>
                <button type='submit' className=' relative w-[17%] h-[60%] bg-[#1C85ED] my-auto rounded-full z-10 ml-[61%]'>
                    <p className=' absolute top-1.5 left-7 z-10 inter400 opacity-90 text-white'>Change Photo</p>
                    <input type='file' className='absolute top-1.5 -left-7 scale-75 z-20 opacity-0' />
                </button>
            </div>

            <form className=' relative flex-col w-[92%] mx-auto mt-8'>
                <p className=' font-thin opacity-60 text-white text-[15px] ml-[2px]'>Email</p>
                <input type='email' placeholder={user.email} className=' w-full bg-[#252525] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040] rounded-md py-1.5 px-2 pl-3 text-white' disabled />

                <div className=' flex gap-12 w-full mt-4'>
                    <div className=' flex-col w-full'>
                        <p className=' font-thin opacity-60 text-white text-[15px] ml-[2px]'>User Name</p>
                        <input type='text' placeholder={user.username} className=' w-full bg-[#252525] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040] rounded-md py-1.5 px-2 pl-3 text-white'/>
                    </div>
                    
                    <div className=' flex-col w-full'>
                        <p className=' font-thin opacity-60 text-white text-[15px] ml-[2px]'>Full Name</p>
                        <input type='text' placeholder={user.fullname} className=' w-full bg-[#252525] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040] rounded-md py-1.5 px-2 pl-3 text-white' />
                    </div>
                </div>

                <p className=' font-thin opacity-60 text-white text-[15px] ml-[2px] mt-4'>Bio</p>
                <textarea placeholder={user.bio} className=' w-full bg-[#252525] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040] rounded-md py-1.5 px-2 pl-3 text-white' />

                <p className=' font-thin opacity-60 text-white text-[15px] ml-[2px] mt-4'>Gender</p> 
                <input id="radio1" type="radio" name="gender" value='Male' className=' scale-150 mt-3 ml-1'/><label className=' ml-5 nunito-sans700 text-[15px] text-white' for="radio">Male</label>
                <input id="radio1" type="radio" name="gender" value='Female' className=' scale-150 ml-11 bg'/><label for="radio" className=' ml-5 nunito-sans700 text-[15px] text-white'>Female</label>

                <div className=' flex gap-12 w-full mt-4'>
                    <div className=' flex-col w-full'>
                        <p className=' font-thin opacity-60 text-white text-[15px] ml-[2px]'>Change Password</p>
                        <input type='text' placeholder="Change Password" className=' w-full bg-[#252525] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040] rounded-md py-1.5 px-2 pl-3 text-white' disabled />
                    </div>
                    
                    <div className=' flex-col w-full'>
                        <p className=' font-thin opacity-60 text-white text-[15px] ml-[2px]'>Confirm Password</p>
                        <input type='text' placeholder="Confirm Password" className=' w-full bg-[#252525] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040] rounded-md py-1.5 px-2 pl-3 text-white' />
                    </div>
                </div>

                <div className=' gap-3 flex my-auto mt-10'>
                    <button className=' w-[18%] border-2 border-[#1C85ED] rounded-full py-1 ml-[31%]'>
                        <p className=' text-[#1C85ED]'>Cancle</p>
                    </button>

                    <button type='submit' className=' w-[18%] bg-[#1C85ED] rounded-full py-1'>
                        <p className=' text-white'>Save Changes</p>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Setting;