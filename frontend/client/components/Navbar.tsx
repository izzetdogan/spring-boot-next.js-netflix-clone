import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { RiShutDownLine } from "react-icons/ri";

const Navbar: React.FC = () => {
  const [isScroll, setIsScroll] = useState(false);
  const userState = useContext(UserContext);
  const router = useRouter();
  const logout = () => {
    window.localStorage.removeItem("auth");
    userState?.setState(null);
    router.push("/login");
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScroll && `bg-[#141414]`}`}>
      <div className="flex items-center space-x-2 md:space-x-10 ">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="flex  space-x-4 font-bold">
          <li className="navbarLink ">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="navbarLink">
            <Link href="/movies">
              <a>Movies</a>
            </Link>
          </li>
          <li className="navbarLink">
            <Link href="/series">
              <a>Series</a>
            </Link>
          </li>
          <li className="navbarLink">
            <Link href="/my-list">
              <a>My List</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-center text-sm font-light">
        <div className="font-bold">
          {userState && userState.state?.token ? userState.state.name : "User"}{" "}
        </div>

        <div className="w-8 flex  ml-4 mr-4">
          <img
            className="cursor-pointer rounded "
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
          />
        </div>
        <div className="font-bold ">
          {userState && userState.state?.token ? (
            <>
              <a className="cursor-pointer" onClick={logout}>
                <RiShutDownLine className="text-2xl hover:text-[#E50914]" />
              </a>
            </>
          ) : (
            ""
          )}{" "}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
