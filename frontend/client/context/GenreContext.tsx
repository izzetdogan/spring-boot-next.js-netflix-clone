import React, { useState, createContext } from "react";
import { Genre } from "../typing";

type CurrentGenre = {
  currentGenre: string;
  setCurrentGenre: React.Dispatch<React.SetStateAction<string>>;
};

type GenreContextProviderProps = {
  children: React.ReactNode;
};

const GenreContext = createContext<CurrentGenre | null>(null);
//const GenreContext = createContext<CurrentGenre>({} as CurrentGenre);

const GenreProvider = ({ children }: GenreContextProviderProps) => {
  const [currentGenre, setCurrentGenre] = useState("");
  return (
    <GenreContext.Provider value={{ currentGenre, setCurrentGenre }}>
      {children}
    </GenreContext.Provider>
  );
};

export { GenreContext, GenreProvider };
