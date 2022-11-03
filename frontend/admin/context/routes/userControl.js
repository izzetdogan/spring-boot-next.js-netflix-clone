import { useRouter } from "next/router";
import React, { Children, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";

const UserControl = ({ children }) => {
  const { state } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    controlUser();
  }, []);

  const controlUser = () => {
    if (state == null && router.pathname !== "login") {
      router.push("/login");
    }
  };

  return <>{children}</>;
};

export default UserControl;
