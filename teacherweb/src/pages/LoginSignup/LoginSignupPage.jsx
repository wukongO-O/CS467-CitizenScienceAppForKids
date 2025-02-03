import { useState } from "react";
import LoginSignupForm from "./LoginSignupForm";
import { useNavigate } from "react-router-dom";

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleAuthSuccess = () => {
    // Redirect to homepage after successful login/signup, will need to create this later
    navigate("/");
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