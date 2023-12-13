import { createContext, useState, useEffect } from "react";
import { getUserById } from "../utils/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      getUserById()
        .then((userData) => {
          setUser(userData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        });
    }, []);
  
    return (
      <UserContext.Provider value={{ user, isLoading }}>
        {children}
      </UserContext.Provider>
    );
  };