import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";


const useLogin = () => {
	const {authUser, setAuthUser } = useAuthContext();

	const loginFN = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		try {
			const res = await fetch("http://localhost:5000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			data.message ="login"

			localStorage.setItem("chat-user", JSON.stringify(data));
			localStorage.setItem("token" , data.token)
			console.log("data in uselogin" , data)
			// data.message = 'from use login '
            console.log("authUser in uselogin b: ",authUser)
			setAuthUser(data);
            console.log("authUser in uselogin a: ",authUser)
            toast.success(data.message);
		} catch (error) {
            toast.error(error.message)
        } 
	};

	return { loginFN };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}