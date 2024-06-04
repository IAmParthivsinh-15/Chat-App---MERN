import { toast } from 'react-toastify';
import { useAuthContext } from "../context/AuthContext";
import useConversation from '../zustand/useConversation';
import { useEffect } from 'react';

const usePendingReq = () => {
    const { authUser } = useAuthContext();
    const { pendingReqs, setPendingReq } = useConversation();
    
    const pendingReq = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/users/allpendingrequests/${authUser._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (data.error) {
                toast.error("Error in fetching pending requests");
            } else {
                console.log(data);
                setPendingReq(data);
            }
        } catch (error) {
            toast.error("Error in fetching pending requests");
        }
    };

    return { pendingReq };


};

export default usePendingReq;
