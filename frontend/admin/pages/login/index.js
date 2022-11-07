import React, { useContext, useEffect, useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, setState } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {}, []);
  const handleLogin = async e => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/auth/login`, {
        username: username,
        password: password,
      });

      if (!data.isAdmin) {
        toast.error("You are not a admin");
      } else {
        setState({ ...data });

        window.localStorage.setItem("auth", JSON.stringify(data));

        router.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  if (state) router.push("/");
  return (
    <div className={styles.login}>
      <form className={styles.loginForm}>
        <div className={styles.loginCont}>
          <h3>
            email: admin@gmail.com
            <br />
            password: admin6287
          </h3>
        </div>
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={e => setPassword(e.target.value)}
        />
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
