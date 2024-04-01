import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useVerifyEmail = () => {
    console.log("useVerifyEmail");
    const { setAuthUser } = useAuthContext();

    const verifyEmail = async (otp) => {
        console.log("inside verify email");
        console.log("otp : ", otp);
        try {
            const token = localStorage.getItem('token');
            // console.log(token)
            const res = await fetch("http://localhost:5000/api/users/verifyotp", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include JWT token in the Authorization header
                },
                body: JSON.stringify({ otp })
            });
            const data = await res.json();
            console.log(data);
            if (data.error) {
                toast.error("Invalid OTP");
                return;
            }
            setAuthUser(data);
            toast.success("OTP Verified Successfully!");
        } catch (error) {
            toast.error("server error...");
            console.log(error);
        }
    };
    return { verifyEmail };
}

export default useVerifyEmail;
