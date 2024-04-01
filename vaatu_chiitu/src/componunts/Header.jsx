import { useEffect } from "react";
import useConversation from "../zustand/useConversation";

const Header = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  console.log("selected conversation", selectedConversation);

//   useEffect(() => {
//     return () => setSelectedConversation(null);
//   }, [selectedConversation]);

  if (!selectedConversation) {
    return null; 
  }
  return (
    <div className="flex h-[11.4454%] w-full absolute top-0 bg-[#414141] shadow-[0px_26.851484298706055px_33.56435394287109px_0px_#0000000D]">
      <img
        src={selectedConversation.profilePic}
        className=" w-[62px] h-[62px] rounded-full mt-2 ml-6"
      />
      <div className=" flex flex-col pl-4 my-auto">
        <p className=" leading-[30px] text-[26px] inter600 text-[#FFFFFFE5] opacity-90 mt-1 tracking-[0.01em]">
          {selectedConversation.fullname}
        </p>
        <p className=" leading-[19px] text-[13px] inter400 text-[#FFFFFFE5] opacity-80 ml-1 -tracking-[0.01em]">
          {selectedConversation.bio}
        </p>
      </div>
    </div>
  );
};

export default Header;
