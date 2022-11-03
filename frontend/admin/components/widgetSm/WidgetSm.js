import styles from "./widgetSm.module.css";
import Visibility from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?newUsers=true");
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getNewUsers();
  }, []);

  return (
    <div className={styles.widgetSm}>
      <span className={styles.title}>New Join Members</span>
      <ul className={styles.list}>
        {newUsers.map(user => (
          <li key={user.id} className={styles.listItem}>
            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
              }
              alt=""
              className={styles.img}
            />
            <div className={styles.user}>
              <span className={styles.username}>{user.name}</span>
            </div>
            <button className={styles.button}>
              <Link href={`/users/${user.id}`}>
                <a>
                  <Visibility className="widgetSmIcon" />
                  Display
                </a>
              </Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
