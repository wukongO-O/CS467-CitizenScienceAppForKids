import { useContext, createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            localStorage.removeItem("user");
          }
        }
        setLoading(false);
      }, [setUser]);

    const login = (userData) =>{
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));//store in local storage to not loose user state on refresh
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };


    return (
        <UserContext.Provider value = {{user, login, logout, setUser, loading}} >
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => useContext(UserContext);
