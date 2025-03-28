import PropTypes from "prop-types";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import useSignup from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";


export default function LoginSignupForm({ isLogin, onAuthSuccess, handleViewChange }) {
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { login, error: loginError, loading: loginLoading } = useLogin();
  const { signup, error: signupError, loading: signupLoading } = useSignup();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    if (formData.username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
     
    if (!isLogin && !formData.email.includes("@")) {
      setEmailError("Must be a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (isLogin) {
      // Logic for log in
      const response = await login(formData.username, formData.password);
      if (response.success) {
        navigate("/homepage")
      } else {
        console.log("Login failed:", response.error);
      }
    } else {
      // Sign up user
      const response = await signup(formData.username, formData.email, formData.password);
      if (response.success) {
        alert("Account created successfully, please log in.");
        handleViewChange(); // Switch to login form
      } else {
        console.log("Signup failed:", response.error); // Add console log
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="section-title">
        {isLogin ? "Teacher Login" : "Create an Account"}
      </h1>
      <input
        type="username"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      {usernameError && <p className="error">{usernameError}</p>}
      {!isLogin && (
        <>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {emailError && <p className="error">{emailError}</p>}
          {signupError && <p className="error">There was a problem creating a new account</p>}
        </>
      )}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {passwordError && <p className="error">{passwordError}</p>}
      {loginError && <p className="error">There was a problem verifying your credentials</p>}
      
        {isLogin ? (
          <p>
            Need an account?{" "}
            <a
              onClick={(e) => {
                e.preventDefault();
                handleViewChange();
              }}
            >
              Sign up
            </a>{" "}
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a
              onClick={(e) => {
                e.preventDefault();
                handleViewChange();
              }}
            >
              Log in
            </a>{" "}
          </p>
        )}
      
      <button
        type="submit"
        className="button"
        style={{ display: "block", margin: "15px auto" }}
        disabled={loginLoading || signupLoading}
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}


LoginSignupForm.propTypes = {
  isLogin : PropTypes.bool.isRequired,
  onAuthSuccess:PropTypes.func,
  handleViewChange: PropTypes.func.isRequired
}