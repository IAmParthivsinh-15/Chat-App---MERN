import Message from "../componunts/Message.jsx";
import useGetMessage from "../hooks/useGetMessage.js";
import { useAuthContext } from "../context/AuthContext";

const ChatBox = () => {
  const message = [
    {
      message_id: 5,
      sender_id: 1,
      reciever_id: 2,
      message: "Helllllooo",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 6,
      sender_id: 2,
      reciever_id: 1,
      message:
        "Helllll0 ndsj sdhfh sf sfs f iujdfdhfjd sfjfdh jdsf sfjhsdfhuf s fhjsfuhsjf  sdfjf usfjsd fufjsf ushfjdj suhf isfuhsifjdf hbhsbsn",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 7,
      sender_id: 1,
      reciever_id: 2,
      message: "Hellllloooooooooooooooo",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 8,
      sender_id: 2,
      reciever_id: 1,
      message:
        "Helllll0 ndsj sdhfh sf sfs f iujdfdhfjd sfjfdh jdsf sfjhsdfhuf s fhjsfuhsjf  sdfjf usfjsd fufjsf ushfjdj suhf isfuhsifjdf hbhsbsn",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 9,
      sender_id: 1,
      reciever_id: 2,
      message: "Helllllooo",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 10,
      sender_id: 2,
      reciever_id: 1,
      message:
        "Helllll0 ndsj sdhfh sf sfs f iujdfdhfjd sfjfdh jdsf sfjhsdfhuf s fhjsfuhsjf  sdfjf usfjsd fufjsf ushfjdj suhf isfuhsifjdf hbhsbsn",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 11,
      sender_id: 1,
      reciever_id: 2,
      message: "",
      time: "8:10 AM",
      img: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-james-wheeler-417074.jpg&fm=jpg",
    },
    {
      message_id: 12,
      sender_id: 2,
      reciever_id: 1,
      message:
        "Helllll0 ndsj sdhfh sf sfs f iujdfdhfjd sfjfdh jdsf sfjhsdfhuf s fhjsfuhsjf  sdfjf usfjsd fufjsf ushfjdj suhf isfuhsifjdf hbhsbsn",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 13,
      sender_id: 1,
      reciever_id: 2,
      message: "Helllllooo",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 14,
      sender_id: 2,
      reciever_id: 1,
      message: "",
      time: "8:10 AM",
      img: "data:image/jpeg;base64,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",
    },
    {
      message_id: 15,
      sender_id: 1,
      reciever_id: 2,
      message: "Hellllloooooooooooooooo",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 16,
      sender_id: 2,
      reciever_id: 1,
      message:
        "Helllll0 ndsj sdhfh sf sfs f iujdfdhfjd sfjfdh jdsf sfjhsdfhuf s fhjsfuhsjf  sdfjf usfjsd fufjsf ushfjdj suhf isfuhsifjdf hbhsbsn",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 17,
      sender_id: 1,
      reciever_id: 2,
      message: "Helllllooo",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 18,
      sender_id: 2,
      reciever_id: 1,
      message:
        "Helllll0 ndsj sdhfh sf sfs f iujdfdhfjd sfjfdh jdsf sfjhsdfhuf s fhjsfuhsjf  sdfjf usfjsd fufjsf ushfjdj suhf isfuhsifjdf hbhsbsn",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 19,
      sender_id: 1,
      reciever_id: 2,
      message: "Hellllloooooooooooooooo",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 20,
      sender_id: 2,
      reciever_id: 1,
      message:
        "Helllll0 ndsj sdhfh sf sfs f iujdfdhfjd sfjfdh jdsf sfjhsdfhuf s fhjsfuhsjf  sdfjf usfjsd fufjsf ushfjdj suhf isfuhsifjdf hbhsbsn",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 21,
      sender_id: 1,
      reciever_id: 2,
      message: "Helllllooo",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 22,
      sender_id: 2,
      reciever_id: 1,
      message:
        "Helllll0 ndsj sdhfh sf sfs f iujdfdhfjd sfjfdh jdsf sfjhsdfhuf s fhjsfuhsjf  sdfjf usfjsd fufjsf ushfjdj suhf isfuhsifjdf hbhsbsn",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 23,
      sender_id: 1,
      reciever_id: 2,
      message: "Hellllloooooooooooooooo",
      time: "8:10 AM",
      img: "",
    },
    {
      message_id: 24,
      sender_id: 2,
      reciever_id: 1,
      message: "H",
      time: "8:10 AM",
      img: "",
    },
  ];

  const { messages } = useGetMessage();
  console.log("messages : ", messages);
  const { authUser } = useAuthContext();

  return (
    <div className="w-full h-[78%] mt-[7.9%] flex-col overflow-y-auto z-10">
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <Message
            key={message._id}
            message={message}
            userId={authUser?._id}
          />
        ))
      ) : (
        <p>No Messages</p>
      )}
    </div>
  );
};

export default ChatBox;
