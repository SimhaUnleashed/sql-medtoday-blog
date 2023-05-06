import axios from "axios";
import { createContext, useEffect, useState } from "react";
import app from "./axiosConfig";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
    
  );
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
    
  );

  const login = async (inputs) => {
    const res = await app.post("http://localhost:8800/api/auth/login", inputs);
    setCurrentUser(res.data);
    
  };

  const adminlogin = async (inputs) => {
    const res = await app.post("http://localhost:8800/api/auth/adminlogin", inputs);
    setAdmin(res.data);
    
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:8800/api/auth/logout");
    setCurrentUser(null);
    setAdmin(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [currentUser,admin]);

  return (
    <AuthContext.Provider value={{ currentUser, login,admin, logout,adminlogin }}>
      {children}
    </AuthContext.Provider>
  );
};