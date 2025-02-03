import { useState } from "react";

export default function LoginSignupForm({ isLogin, onAuthSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...", formData);
    // Simulate authentication, will need to replace with API call later
    setTimeout(() => {
      onAuthSuccess();
    }, 1000);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
    </form>
  );
}
