import { toast } from "react-toastify";
import useConversation from "../zustand/useConversation"

const useSendMessage = () => {
  const {messages , setMessages , selectedConversation } = useConversation();

  const sendMessage = async (message)=>{
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConversation?._id}`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include JWT token in the Authorization header
            },
            body: JSON.stringify({ message })
        })
        const data = await  res.json()
        if(data.error){
            toast.error("no msges")
            return
        }
        setMessages([...messages,data])
        toast.success("msg sent succesfully")
    } catch (error) {
        toast.error(error.message)
    }
}
return {sendMessage}
}

export default useSendMessage
