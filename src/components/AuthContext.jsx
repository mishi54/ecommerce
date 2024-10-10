import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem("users");
      return storedUser ? JSON.parse(storedUser)[0] : null;
    });
  
    const login = (userData) => {
      setUser(userData);
      localStorage.setItem("users", JSON.stringify([userData])); 
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem("users");
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {
  return useContext(AuthContext);
};
