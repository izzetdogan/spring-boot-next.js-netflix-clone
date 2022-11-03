import styles from "./widgetLg.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Visibility from "@mui/icons-material/Visibility";

export default function WidgetLg() {
  const [newMovies, setNewMovies] = useState([]);
  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const res = await axios.get("/movies/last");
      setNewMovies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.widgetLg}>
      <h3 className={styles.title}>Latest Movies</h3>
      <table className={styles.widgetLgTable}>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Year</th>
          </tr>

          {newMovies &&
            newMovies.map((movie, index) => (
              <tr key={index}>
                <td className="widgetLgUser">
                  <img
                    src={movie.movieImage}
                    alt=""
                    className={styles.widgetLgImg}
                  />
                  <span>{movie.title}</span>
                </td>
                <td className="widgetLgDate">
                  {movie &&
                    movie.genres &&
                    movie.genres.map(genre => genre.genre)}
                </td>
                <td className="widgetLgAmount">{movie.year}</td>
                <td className={styles.widgetLgStatus}>
                  <button className={styles.button}>
                    <Link href={`/movies/${movie.id}`}>
                      <a>
                        <Visibility className="widgetSmIcon" />
                      </a>
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
