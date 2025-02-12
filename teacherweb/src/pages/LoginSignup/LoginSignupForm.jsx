import { useState } from "react";
import teacherData from '../../components/teacherdata.json';

export default function LoginSignupForm({ isLogin, onAuthSuccess }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form", formData);
    const teacher = teacherData.teachers.find(
      (teacher) =>
        teacher.username === formData.username && teacher.password === formData.password
    );

    if (teacher) {
      // Successful login
      console.log("Login successful");
      setError(null);
      onAuthSuccess();
    } else {
      // Invalid credentials
      console.log("Login failed");
      setError("Invalid username or password");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="username"
        name="username"
        placeholder="Username"
        value={formData.username}
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
      {error && <p className="error">{error}</p>}
      <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
    </form>
  );
}
