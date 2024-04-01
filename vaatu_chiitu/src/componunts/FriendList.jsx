import useConversation from "../zustand/useConversation.js";

const FriendList = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  // const isSelected = selectedConversation?._id === user._id;
  return (
    <div
      tabIndex={user._id}
      className="relative w-full py-3 pl-4 ease-in max-h-[83px] flex rounded-xl hover:bg-[#4D4D4D] transition-all delay-0 focus:bg-[#4D4D4D]"
      onClick={() => setSelectedConversation(user)}
    >
      {
        console.log("conversation \n " , selectedConversation)
      }
      <img src={user.profilePic} className=" rounded-full w-[59px] h-[59px]" />
      <div className=" flex flex-col pl-4 my-auto">
        <p className=" leading-[30px] text-[23px] inter600 text-[#FFFFFFE5] opacity-90 mt-1 tracking-[0.01em]">
          {user.fullname}
        </p>
        <p className=" leading-[19px] text-[14px] inter400 text-[#FFFFFFE5] opacity-80 ml-[0.5px] mt-1 -tracking-[0.01em]">
          {user.lastMessage}
        </p>
      </div>
      {/* <p className=" inter400 text-[#FFFFFFE5] opacity-80 leading-[19px] text-[14px] mt-1 absolute right-5 top-3 tracking-[0.03em]">
        {user.time}
      </p> */}
    </div>
  );
};

export default FriendList;
