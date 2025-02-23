import { useState } from "react";
import teacherData from '../../components/teacherdata.json';

export default function LoginSignupForm({ isLogin, onAuthSuccess }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const storedTeachers = JSON.parse(localStorage.getItem("teachers")) || [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form", formData);

    if (isLogin) {
      // Logic for log in
      const teacher = storedTeachers.find(
        (teacher) =>
          teacher.username === formData.username && teacher.password === formData.password
      );

      if (teacher) {
        console.log("Login successful");
        setError(null);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loggedInTeacher", formData.username); // Store username for account page
        onAuthSuccess();
      } else {
        console.log("Login failed");
        setError("Invalid username or password");
      }
    } else {
      // Logic for sign up
      const existingUser = storedTeachers.find(
        (teacher) => teacher.username === formData.username
      );

      if (existingUser) {
        setError("Username already exists. Choose a different one.");
        return;
      }

      // Add new teacher to temporary storage
      const updatedTeachers = [...storedTeachers, { username: formData.username, password: formData.password }];
      localStorage.setItem("teachers", JSON.stringify(updatedTeachers));

      console.log("Signup successful");
      setError(null);
      alert("Account created successfully, please log in.");
      navigate("/");
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
