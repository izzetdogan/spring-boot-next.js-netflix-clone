import {
  PermIdentity,
  BarChart,
  LineStyleOutlined,
  PlayCircleFilledOutlined,
  VideoCameraBack,
} from "@mui/icons-material";
import styles from "./sidebar.module.css";
import Link from "next/link";
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <h3 className={styles.title}>Dashboard</h3>
          <ul className={styles.list}>
            <Link href="/">
              <li className={styles.listItem}>
                <LineStyleOutlined />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className={styles.menu}>
          <h3 className={styles.title}>Quick Menu</h3>
          <ul className={styles.list}>
            <Link href="/lists">
              <li className={styles.listItem}>
                <BarChart />
                Lists
              </li>
            </Link>
            <Link href="/users">
              <li className={styles.listItem}>
                <PermIdentity />
                Users
              </li>
            </Link>
            <Link href="/movies">
              <li className={styles.listItem}>
                <PlayCircleFilledOutlined />
                Movies
              </li>
            </Link>
            <Link href="/genre">
              <li className={styles.listItem}>
                <VideoCameraBack />
                Genre
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
