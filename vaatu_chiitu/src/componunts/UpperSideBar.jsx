import logo from '../assets/logo.svg'
import new_friend from '../assets/New_Friend.svg'
import setting from '../assets/Setting.svg'

const UpperSideBar = ({setOpenSetting, buttonRef, setAddFriend}) => {
    return (
        <div className=' h-[22%] w-[33.3065%] bg-[rgb(46,46,46)] fixed top-0 left-0 z-10'>
            {/* -- Logo & Buttons -- */}
            <div className='flex'>
                <img src={logo} className='w-[51%] h-[7%] ml-[20px] mt-[5.5%]'></img>
                <img src={new_friend} ref={buttonRef} onClick={() => setAddFriend(true)} className='mr-1 h-[47px] mt-[5.5%] ml-[15%] cursor-pointer' />
                <img src={setting} ref={buttonRef} onClick={() => setOpenSetting(true)} className='h-[47px] mt-[5.5%] ml-[2%] cursor-pointer'/>
            </div>

            {/* -- Searchbar -- */}
            <div className=' absolute w-[87%] top-[100px] left-7'>
                <input type='text' placeholder='Search in Chat' className=' w-full bg-[#252525] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040] rounded-md py-1.5 px-2 pl-12 text-white' />
            </div>
        </div>
    );
}

export default UpperSideBar;