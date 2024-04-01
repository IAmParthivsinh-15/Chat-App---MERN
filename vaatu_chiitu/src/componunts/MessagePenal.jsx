import { useState, useEffect, useRef } from "react";
import Gallery from "../assets/Gallery.svg";
import Send from "../assets/Send.svg";
import useSendMessage from "../hooks/useSendMessage";

const MessagePenal = () => {
  const [image, setImage] = useState(null);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const [msg, setMsg] = useState("");
  const { sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!msg) {
      return;
    }
    await sendMessage(msg);
    setMsg("");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setImage(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, buttonRef]);

  return (
    <form
      onSubmit={handleSubmit}
      ref={menuRef}
      className=" flex h-[9.8987%] w-full absolute bg-[#414141] bottom-0 shadow-[0px_8px_6px_0px_#0000000D,inset_0px_1px_1px_0px_#FFFFFF40,inset_0px_-1px_1px_0px_#00000024,inset_2px_3px_3px_-3px_#FFFFFF99]"
    >
      <img src={Gallery} className=" ml-4 h-[55px] cursor-pointer my-auto" />
      <input
        type="file"
        accept="image/*"
        onChange={(event) =>
          setImage(URL.createObjectURL(event.target.files[0]))
        }
        className=" cursor-pointer absolute left-7 top-5 w-[30px] opacity-0"
      />

      <input
        type="text"
        placeholder="Message"
        className=" bg-[#3A3A3A] shadow-[inset_0px_-0.7302268743515015px_0.7302268743515015px_0px_#FFFFFF59,inset_1.460453748703003px_2.920907497406006px_2.920907497406006px_-0.7302268743515015px_#00000040] rounded-full h-[70%] w-[85%] my-auto ml-2 mr-2 pl-7 text-white"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      {/* <img src={Send} type="submit" className=" mr-3 h-[55px] my-auto" /> */}
      <button type="submit" className="mr-3 h-[55px] my-auto">
        <img src={Send} className="h-full" />
      </button>

      {/* -- Pic Preview -- */}
      {image && (
        <div
          ref={buttonRef}
          className=" drop-shadow-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 absolute flex-col bg-[#404040] max-h-[500px] max-w-[380px] z-50 rounded-lg left-[2.5%] bottom-[110%] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040,2px_4px_4px_0px_#00000040]"
        >
          <img
            src={image}
            className=" max-h-[350px] rounded-2xl mx-auto px-[25px] py-[25px]"
          />
          <img
            src={Send}
            onClick={() => setImage(null)}
            className=" absolute right-2 cursor-pointer h-[50px] bottom-1 my-auto"
          />
        </div>
      )}
    </form>
  );
};

export default MessagePenal;
