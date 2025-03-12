import { useState } from "react";
import { useUserContext } from "../context/UserContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {setUser} = useUserContext();

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:5000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("isAuthenticated", "true");
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};

export default useLogin;