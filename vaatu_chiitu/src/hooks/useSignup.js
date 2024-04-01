import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const { authUser , setAuthUser } = useAuthContext();


    const signup = async ({fullname , username , password , confirmPassword , gender ,email, profilePic})=>{
        console.log("hello")
        console.log( "Inside Signup", {
            fullname, username, password, confirmPassword, gender , profilePic , email
        })
            
            try{
            console.log("hello")
            const res = await fetch("http://localhost:5000/api/auth/signup" , {
                method:"POST",
                headers:{ "Content-Type":"application/json"} , 
                // credentials:true,
                body:JSON.stringify({ fullname,username,password,confirmPassword,gender,profilePic,email })
            })

            const data = await res.json() ;
            localStorage.setItem("token",data?.token)
            console.log("data : ",data)
            console.log("useSignup.js")
            console.log(data)
            if (data.error) {
                toast.error(data.message)
                console.log(data.error)
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
            console.log(data)
            setAuthUser(data);
            console.log("authUser in signUp : " , authUser)
            toast.success(data.message);
        }
        catch(e){
            toast.error("server has some error...")
            console.log(e)
        }
    }


  return {signup}
}

export default useSignup

