import { useState } from "react";
import LoginSignupForm from "./LoginSignupForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");
  //   if (isAuthenticated === "true") {
  //     navigate("/homepage");
  //   }
  // }, [navigate]);

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