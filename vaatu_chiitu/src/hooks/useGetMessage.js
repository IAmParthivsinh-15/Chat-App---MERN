import { useEffect } from "react"
import useConversation from "../zustand/useConversation"
import { toast } from "react-toastify"

const useGetMessage = () => {
  const {messages , setMessages , selectedConversation}=useConversation()
  useEffect(()=>{
    const getMessages = async ()=>{
        try {
            const token = localStorage.getItem('token');
            console.log("receiver id : " , selectedConversation?._id )
            const res = await fetch(`http://localhost:5000/api/messages/${selectedConversation?._id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            const data = await res.json()
            if(data.error){
                toast.error("error in fetching error")
            }
            setMessages(data)
        } catch (error) {
            toast.error(toast.error)
        }
    }
    if(selectedConversation?._id){
        getMessages()
    }
  },[selectedConversation?._id,setMessages])
  return {messages}
}

export default useGetMessage
