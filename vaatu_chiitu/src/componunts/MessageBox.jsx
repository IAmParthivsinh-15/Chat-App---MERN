import Header from "../componunts/Header.jsx";
import MessagePenal from "../componunts/MessagePenal.jsx";
import ChatBox from "../componunts/ChatBox.jsx";
import useConversation from "../zustand/useConversation.js";

const MessageBox = ({ user }) => {
  const { selectedConversation } = useConversation();
  return (
    <div className=" relative h-full bg-[#343434] w-[69.6934%] flex-col z-10">
      {/* -- Header -- */}
      <Header />

      {/* -- Chat Box -- */}
      <ChatBox/>

      {/* -- Message Penal -- */}
      <MessagePenal />
    </div>
  );
};

export default MessageBox;
