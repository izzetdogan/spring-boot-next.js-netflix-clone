import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Item from "../components/Item";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import { Movie, User } from "../typing";

export interface IUser extends User {
  movies: [Movie];
}

const UserList: NextPage = () => {
  const userState = useContext(UserContext);
  const [movies, setMovies] = useState<[Movie] | null>(null);
  const [control, setControl] = useState(0);
  let id: number = userState?.state?.id as number;

  useEffect(() => {
    if (id !== null) {
      setControl(0);
      getUserList(id);
    }
  }, [control || userState?.state?.token]);

  const getUserList = async (id: number) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/users/${id}`);
      console.log("data ", res.data);
      setMovies(res.data.movies);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>NetFlix-My-List</title>
      </Head>
      <Navbar />{" "}
      <div className=" flex flex-col ml-[2%] mt-[10%] z-20 w-[50%] gap-5">
        <h1 className="gap-x-3 font-bold text-2xl gap-y-3">My-List</h1>
        <div className="flex gap-x-5 gap-y-5">
          {movies?.map(a => (
            <Item item={a} setControl={setControl} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
