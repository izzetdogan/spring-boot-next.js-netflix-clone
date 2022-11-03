import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { User } from "../typing";

export type CurrentUser = {
  state: User | null;
  setState: React.Dispatch<React.SetStateAction<User | null>>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<CurrentUser | null>(null);

const UserProvider = ({ children }: UserContextProviderProps) => {
  const [state, setState] = useState<User | null>(null);

  useEffect(() => {
    const handleState = async () => {
      const storageData = await JSON.parse(
        window.localStorage.getItem("auth") as any
      );
      setState(storageData);
    };
    handleState();
  }, []);

  const token = state && state.token ? "Bearer " + state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = token;

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
