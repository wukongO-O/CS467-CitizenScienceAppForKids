import { useContext, createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = (userData) =>{
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value = {{user, login, logout, setUser}} >
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => useContext(UserContext);
