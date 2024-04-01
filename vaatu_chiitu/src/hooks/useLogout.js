import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
	const { setAuthUser } = useAuthContext();

	const logoutFN = async () => {
		try {
			const res = await fetch("http://localhost:5000/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
			toast.success("Logged Out Successfully")
		} catch (error) {
			toast.error(error.message);
		} 
	};

	return { logoutFN };
};
export default useLogout;