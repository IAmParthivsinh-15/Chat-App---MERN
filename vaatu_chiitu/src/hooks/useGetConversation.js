import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const useGetConversation = () => {

    const [conversation , setConversation] = useState([])
    useEffect(()=>{
        const getConversations = async ()=>{
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/users/FriendsOfUser',{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Include JWT token in the Authorization header
                    },
                })
                const data = await res.json()
                console.log("data on all friends in sidebar : " , data)
                if(data.error){
                    toast.error("error in fetching data for sidebar")
                    return
                }
                setConversation(data)
                console.log("data sidebar : " , data)
            } catch (error) {
                toast.error("Error In Fetching Data For SideBar")
            }
        }
        getConversations()
    },[])
    return {conversation}
}

export default useGetConversation
