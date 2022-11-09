import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userState = useContext(UserContext);
  const router = useRouter();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/login`,
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        userState?.setState({ ...data });

        window.localStorage.setItem("auth", JSON.stringify(data));
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>NetFlix-SignIn</title>
      </Head>
      <Image
        src="https://assets.nflxext.com/ffe/siteui/vlv3/79fe83d4-7ef6-4181-9439-46db72599559/bd4f2024-8853-47ee-b84b-779b52fd5f12/TR-tr-20221017-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        className="-z-10 opacity-30 sm:!inline h-screen w-screen"
        layout="fill"
        objectFit="cover"
      />
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
          width={150}
          height={150}
        />
      </div>

      <form
        onSubmit={submitHandler}
        className="relative mt-20 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="admin@gmail.com"
              className="w-full rounded bg-[#333333] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545];"
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="admin6287"
              className="w-full rounded bg-[#333333] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545];"
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <Link href="/register">
            <a className="cursor-pointer text-white hover:underline">
              Sign up now
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
