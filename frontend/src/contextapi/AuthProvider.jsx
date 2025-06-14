import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
const authcontext = createContext();

const authProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const login = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const verifUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifUser();
  }, []);

  return (
    <authcontext.Provider value={{ user, setUser, login }}>
      {children}
    </authcontext.Provider>
  );
};

export const useAuth = () => useContext(authcontext);
export default authProvider;
