import { useState } from "react";
import LoginSignupForm from "./LoginSignupForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginSignupPage({ onAuthSuccess}) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("Login Page Loaded - Authenticated:", isAuthenticated);

    if (isAuthenticated === "true") {
      console.log("Redirecting to /homepage...");
      navigate("/homepage");
    }
  }, [navigate]);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleAuthSuccess = () => {
    localStorage.setItem("isAuthenticated", "true");
    onAuthSuccess();
    navigate("/homepage");
  };

  return (
    <div className="login-signup-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <LoginSignupForm isLogin={isLogin} onAuthSuccess={handleAuthSuccess} />
      <p onClick={toggleForm} className="toggle-text">
        {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
      </p>
    </div>
  );
}