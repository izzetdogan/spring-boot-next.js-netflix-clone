import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Register: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userState = useContext(UserContext);
  const router = useRouter();

  let control: boolean;
  control = true;
  const handleStart = () => {
    setEmail(emailRef.current != null ? emailRef.current.value : "");
  };
  const handleFinish = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/register`,
        {
          username: email,
          password: password,
        }
      );
      setEmail("");
      setPassword("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
      control = false;
    }

    if (control) {
      toast.success("You have registered sucessfully");
      setTimeout(function () {
        router.push("/login");
      }, 1500);
    } else {
      setTimeout(function () {
        router.reload();
      }, 1500);
    }
  };
  if (userState && userState.state?.token) router.push("/");
  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>NetFlix-Register</title>
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
      <div className="z-20">
        <h1 className="text-6xl font-bold">
          Unlimited movies, TV shows,
          <br />{" "}
          <span className="flex items-center justify-center">and more.</span>
        </h1>
        <h2 className="flex items-center justify-center my-10 font-bold text-3xl">
          Watch anywhere. Cancel anytime.
        </h2>

        <div className="flex items-center justify-center">
          {!email ? (
            <label className="flex lex lg:w-[600px]">
              <input
                type="email"
                placeholder="Email"
                ref={emailRef}
                className="w-full text-black  px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545];"
              />
              <button
                className="bg-[#E50914] w-32"
                onClick={() => handleStart()}
              >
                Get Started
              </button>
            </label>
          ) : (
            <form>
              <label className="flex lg:w-[600px]">
                <input
                  type="password"
                  placeholder="password"
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-black  px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545];"
                />

                <button className="bg-[#E50914] w-32" onClick={handleFinish}>
                  Start
                </button>
              </label>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
