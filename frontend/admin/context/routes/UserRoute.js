import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "../AuthContext";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (state) getCurrentUser();
  }, [state]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/users/${state.id}`);
      setOk(true);
    } catch (err) {
      setOk(false);
      console.log(err);
    }
  };

  state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return ok ? <> {children} </> : "";
};

export default UserRoute;
