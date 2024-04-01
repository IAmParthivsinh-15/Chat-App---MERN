import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  console.log("authUser in app.js :", authUser);
  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={authUser ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/home" /> : <Signup />}
        />
        <Route
          path="/"
          element={!authUser ? <Login /> : <Navigate to="/home" />}
        />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
