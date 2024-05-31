import { toast } from "react-toastify";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";

const useSearchFriend = () => {
    const { friendSearchUser, setFriendSearchUser } = useConversation();
    let message = "";
    const searchFriend = async ({ username }) => {
        try {
            console.log("in func");
            const token = localStorage.getItem('token');
            console.log("token in usesrchfrnd ", token);
            const res = await fetch('http://localhost:5000/api/users/searchuser', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ username }),
            });
            console.log("done");
            const data = await res.json();
            console.log("new user: ", data);
            if (data.error) {
                toast.error("Error Occurred in Searching User");
                return;
            }
            setFriendSearchUser(data);
            console.log("friendSearchUser: ", friendSearchUser);
            if (data.length === 0 || data === null) {
                toast.error("No Such User Found!");
                return;
            }
            toast.success(data.message)
            message = data.message;
        } catch (error) {
            toast.error("Error in searching new friend");
            message = data.message;
        }
    };

    useEffect(() => {
        if (friendSearchUser?._id) {
            searchFriend({ username: friendSearchUser.username });
        }
    }, [friendSearchUser?._id]);

    return { searchFriend , message};
};

export default useSearchFriend;
