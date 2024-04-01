import FriendList from "../componunts/FriendList.jsx";
import UpperSideBar from "../componunts/UpperSideBar.jsx";
import MessageBox from "../componunts/MessageBox.jsx";
import Setting from "../componunts/Setting.jsx";
import Logout from "../assets/Logout.svg";
import edit_profile from "../assets/edit_profile.svg";
import pic from "../assets/Frame 8.svg";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiUserAdd } from "react-icons/hi";
import { FaSkullCrossbones } from "react-icons/fa";
import useLogout from "../hooks/useLogout.js";
import useGetConversation from "../hooks/useGetConversation.js";
import { useAuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import useSearchFriend from "../hooks/useSearchFriend.js";
import useConversation from "../zustand/useConversation.js";

const Home = () => {
  const { friendSearchUser, setFriendSearchUser } = useConversation();
  const { authUser } = useAuthContext();
  const [username, setUsern] = useState("");
  const { logoutFN } = useLogout();
  const { conversation } = useGetConversation();
  console.log(conversation ? "Conversations are there" : "empty array");
  console.log(conversation);

  {
    /* -- User Whose Chet You Open -- */
  }
  const user = {
    id: 1,
    name: "Tirth Patel",
    bio: "Heyy I am using Vaatu Chiitu.",
    time: "8.16 PM",
    profilepic: pic,
  };

  {
    /* -- Searched User -- */
  }
  const friend = {
    id: 5,
    username: "Parthivsinh",
    profilepic: pic,
  };

  {
    /* -- Pending Friend Requests --*/
  }
  const requests = [
    {
      id: 1,
      username: "Heer",
      profilepic: pic,
    },
    {
      id: 2,
      username: "Manthan",
      profilepic: pic,
    },
    {
      id: 3,
      username: "Havan",
      profilepic: pic,
    },
    {
      id: 4,
      username: "Suraj",
      profilepic: pic,
    },
    {
      id: 5,
      username: "Bapu",
      profilepic: pic,
    },
    {
      id: 6,
      username: "Nisu",
      profilepic: pic,
    },
    {
      id: 7,
      username: "King",
      profilepic: pic,
    },
    {
      id: 8,
      username: "Venom",
      profilepic: pic,
    },
  ];

  const [openSetting, setOpenSetting] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [addFriend, setAddFriend] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpenSetting(false);
        setAddFriend(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, buttonRef]);

  const { searchFriend } = useSearchFriend();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    console.log("started");
    await searchFriend({ username });
    // } catch (error) {
    //   toast.error("error in fetching user for frnd req")
    // }
  };
  console.log(username);

  useEffect(()=>{
    
  })

  return (
    <div>
      <div className="flex w-screen h-screen -top-[373px] shadow-[inset_-1.118811845779419px_1.118811845779419px_1.118811845779419px_-2.237623691558838px_#FFFFFF59,0px_26.851484298706055px_33.564353942871094px_0px_#0000000D]">
        {/* -- SideBar -- */}
        <div className=" relative w-[33.3065%] h-full bg-[rgb(46,46,46)] flex-col overflow-y-auto no-scrollbar overflow-x-visible">
          <UpperSideBar
            setOpenSetting={setOpenSetting}
            setAddFriend={setAddFriend}
            buttonRef={buttonRef}
          />

          {/* -- Friend List --  SIDE BAR */}
          <div className=" w-[87%] flex mt-[33%] flex-col flex-1 gap-1 top-40 mx-7 z-1">
            {conversation.map((user) => (
              <FriendList key={user._id} user={user} />
            ))}
          </div>
        </div>

        {/* -- Setting Menu -- */}
        {openSetting && (
          <div
            ref={menuRef}
            className=" absolute flex-col bg-[#404040] h-[90px] w-[174px] z-50 rounded-lg left-[27.5%] top-[12%] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040,2px_4px_4px_0px_#00000040] cursor-pointer"
          >
            <div
              className=" flex gap-3 ml-4 mt-4 hover:scale-105 transition-all duration-200 hover:ml-6"
              onClick={() => {
                setEditProfile(true);
                setOpenSetting(false);
              }}
            >
              <img src={edit_profile} />
              <p className=" leading-[20px] text-[16.5px] font-thin text-[#FFFFFF]">
                Edit Profile
              </p>
            </div>

            <NavLink to="/">
              <div
                className="flex gap-3 ml-4 mt-4 hover:scale-105 transition-all duration-200 hover:ml-6"
                onClick={logoutFN}
              >
                <img src={Logout} className=" mt-[1px]" />
                <p className=" leading-[20px] text-[16.5px] text-[#EF3C56]">
                  Logout
                </p>
              </div>
            </NavLink>
          </div>
        )}

        {/* -- Add Friends -- */}
        {addFriend && (
          <div
            ref={menuRef}
            className=" absolute flex-col bg-[#404040] h-[500px] w-[360px] z-50 rounded-lg left-[23.4%] top-[12%] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040,2px_4px_4px_0px_#00000040]  overflow-y-auto no-scrollbar"
          >
            <div className=" relative  h-full w-full">
              <div className="fixed top-[87px] w-[360px] h-[210px] bg-[#404040] z-50 rounded-xl">
                <p className=" ml-4 mt-5 inter600 leading-[27px] text-[22px] text-[#FFFFFF]">
                  Add Friends
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Search Friend"
                    className=" w-[90%] ml-4 mt-3 bg-[#252525] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040] rounded-md py-1.5 px-2 pl-12 text-white"
                    value={username}
                    onChange={(e) => setUsern(e.target.value)}
                    onKeyDown={(e) => {
                      e.key === "Enter" ? handleSubmit(e) : null;
                    }}
                  />
                </form>

                <div className=" relative flex h-[11.4454%] w-full mt-2">
                  <img
                    src={friendSearchUser?.profilepic}
                    className=" w-[45px] h-[45px] rounded-full mt-2 ml-6"
                  />
                  <div className=" flex flex-col pl-4 my-auto">
                    <p className=" leading-[26px] text-[20px] inter400 text-[#FFFFFFE5] opacity-90 mt-4 tracking-[0.01em]">
                      {friendSearchUser?.nameOfUser}
                    </p>
                  </div>
                  <div className="absolute h-[25px] w-[65px] top-4 right-6 cursor-pointer hover:bg-gradient-to-r from-[#FF981B] to-[#FC236C] hover:scale-110 transition-all duration-200 bg-[#1C85ED] rounded-full flex shadow-[inset_0px_-0.7302268743515015px_0.7302268743515015px_0px_#FFFFFF59,inset_1.460453748703003px_2.920907497406006px_2.920907497406006px_-0.7302268743515015px_#00000040]">
                    <p className=" text-white ml-3 mt-[2.5px] text-[13px]">
                      Add
                    </p>
                    <HiUserAdd className=" mt-[4.5px] scale-105 text-white ml-1" />
                  </div>
                </div>

                <p className="mt-12 ml-4 inter600 leading-[27px] text-[22px] text-[#FFFFFF]">
                  Pending Requests
                </p>
              </div>

              <div className="mt-[58%]">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className=" relative flex h-[11.4454%] w-full mt-2"
                  >
                    <img
                      src={req.profilepic}
                      className=" w-[45px] h-[45px] rounded-full mt-2 ml-6"
                    />
                    <div className=" flex flex-col pl-4 my-auto">
                      <p className=" leading-[26px] text-[20px] inter400 text-[#FFFFFFE5] opacity-90 mt-1 tracking-[0.01em]">
                        {req.username}
                      </p>
                    </div>
                    <div className=" absolute top-4 right-6 cursor-pointer flex">
                      <HiUserAdd className=" mt-[4.5px] scale-150 text-green-500 mr-4" />
                      <FaSkullCrossbones className=" mt-[4.5px] scale-125 text-[#FC236C] ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -- Chat Penal -- */}
        {editProfile ? (
          <Setting user={authUser} setEditProfile={setEditProfile} />
        ) : (
          <MessageBox user={user} />
        )}
      </div>
    </div>
  );
};

export default Home;
