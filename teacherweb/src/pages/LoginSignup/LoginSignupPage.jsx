import { useState } from "react";
import LoginSignupForm from "./LoginSignupForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";

export default function LoginSignupPage() {
  const { user } = useUserContext();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/homepage");
    }
  }, [user, navigate]);

  const handleViewChange = () => setIsLogin(!isLogin);

  // const handleAuthSuccess = () => {
  //   localStorage.setItem("isAuthenticated", "true");
  //   navigate("/homepage");
  // };

  return (
    <div className="login-signup-container">
      <LoginSignupForm isLogin={isLogin}  handleViewChange={handleViewChange} />
    </div>
  );
}