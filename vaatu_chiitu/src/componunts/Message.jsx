import { useAuthContext } from "../context/AuthContext";

const Message = ({ message, userId }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  return (
    <div
      className={
        "chat z-20" +
        (authUser._id === userId ? " chat-end" : " chat-start")
      }
    >
      <div
        className={
          "chat-bubble max-w-[55%] inter400 text-[#FFFFFF] opacity-90" +
          (authUser._id === userId
            ? " bg-[#1C85ED] mr-6"
            : " bg-[#262628] ml-6")
        }
      >
        {message.message ? (
          <p>{message.message}</p>
        ) : (
          <img src={message.img} className=" rounded-md" />
        )}
      </div>
      <div className="chat-footer ml-5 mr-5 mt-0.5 text-[#A0A0A0] inter400">
        {message.time}
      </div>
    </div>
  );
};

export default Message;
