import React, { useState, createContext, useEffect } from "react";
const AuthContext = createContext();
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(
    JSON.parse(window.localStorage.getItem("auth"))
  );
  console.log("auth=", state);
  useEffect(() => {
    const storageData = JSON.parse(window.localStorage.getItem("auth"));
    setState(storageData);
  }, []);

  const token = state && state.token ? "Bearer " + state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = token;

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
