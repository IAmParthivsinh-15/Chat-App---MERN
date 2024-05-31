import React from 'react'
import { toast } from 'react-toastify'

const useSendReq = () => {
  
    const sendReq = async ({friendSearchUser}) => {
        try {
        const id = friendSearchUser?.responseData?.id;
        console.log(id)
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/users/sendrequest/${id}`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const data = await res.json();
        console.log(data)
        if(data){
            toast.success("Request Sent Successfully..")
        }
        else{
            toast.error("some error may be..")
        }
            
        } catch (error) {
            toast.error("error in send req")
        }
    }

    return {sendReq};
}

export default useSendReq
