import { toast } from "react-toastify";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";

const useSearchFriend = () => {
    const { friendSearchUser, setFriendSearchUser } = useConversation();
    let message = "";
    const searchFriend = async ({ username }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/users/searchuser', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ username }),
            });
            const data = await res.json();
            if (data.error) {
                toast.error("Error Occurred in Searching User");
                return;
            }
            setFriendSearchUser(data);
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
