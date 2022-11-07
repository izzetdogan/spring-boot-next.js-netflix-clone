import {
  AdminPanelSettings,
  MailOutline,
  PermIdentity,
} from "@mui/icons-material";

import styles from "./user.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UserForm from "../../components/forms/userForm";

export default function User({ user }) {
  const [updateUser, setUpdateUser] = useState(user);
  const [editedUser, setEditedUser] = useState(user);
  const [changed, setChanged] = useState(0);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const res = await axios.get(`/users/${user.id}`);
        setEditedUser(res.data);
      } catch (err) {
        if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something Went Wrong");
        }
      }
    };

    getUserById();
  }, [changed]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(`/users/${user.id}`, updateUser);
      setChanged(changed + 1);
      toast.success("Updated");
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = e => {
    const value = e.target.value;
    setUpdateUser({ ...updateUser, [e.target.name]: value });
  };

  return (
    <div className={styles.user}>
      <div className={styles.userTitleContainer}>
        <h1>Edit User</h1>
      </div>
      <div className={styles.userContainer}>
        <div className={styles.userShow}>
          <div className={styles.userShowTop}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
              alt=""
              className={styles.userShowImg}
            />
            <div className={styles.userShowTopTitle}>
              <span className={styles.userShowUsername}>{editedUser.name}</span>
            </div>
          </div>
          <div className={styles.userShowBottom}>
            <span className={styles.userShowTitle}>Account Details</span>
            <div className={styles.userShowInfo}>
              <PermIdentity />
              <span className={styles.userShowInfoTitle}>
                {editedUser.name}
              </span>
            </div>
            <div className={styles.userShowInfo}>
              <MailOutline />
              <span className={styles.userShowInfoTitle}>{user.email}</span>
            </div>
            <div className={styles.userShowInfo}>
              <AdminPanelSettings />
              <span className={styles.userShowInfoTitle}>
                Status{" "}
                {editedUser.isAdmin ? (
                  <span>Admin</span>
                ) : (
                  <span>Normal User</span>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.userUpdate}>
          <UserForm
            user={user}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users?newUsers=false`
  );
  const users = await res.json();
  const paths = users.map(user => {
    return {
      params: {
        id: user.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${params.id}`);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
}
