import { useState } from "react";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (username, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + `/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role:"teacher" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { signup, error, loading };
};

export default useSignup;