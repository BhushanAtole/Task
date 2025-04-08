import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // { email, role }

  const login = ({ email, password, role }) => {
    if (email && password && role) {
      const newUser = { email, role };
      setUser(newUser);
      
      // Navigate based on role
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "superuser":
          navigate("/superuser");
          break;
        case "user":
          navigate("/user");
          break;
        default:
          navigate("/");
      }
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
