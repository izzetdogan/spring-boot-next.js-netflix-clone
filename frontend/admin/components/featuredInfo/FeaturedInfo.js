import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./feturedInfo.module.css";

export default function FeaturedInfo() {
  const [list, setLisd] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get("/lists/get-three");
        setLisd(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, []);
  return (
    <div className={styles.featured}>
      {list &&
        list.map((l, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.moneyContainer}>
              <span className={styles.money}>{l.title}</span>
            </div>
            <span className={styles.featuredSub}>
              {l.types.toUpperCase()} : {l.movies.length}
            </span>
          </div>
        ))}
    </div>
  );
}
