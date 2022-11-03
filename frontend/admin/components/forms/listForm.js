import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./form.module.css";

const ListForm = ({ title, handleChange, handleSubmit, handleSelect }) => {
  const [movies, setMovies] = useState([]);
  const [changed, setChanged] = useState(0);
  const [type, setType] = useState("");

  useEffect(() => {
    getMovies();
  }, [changed, type]);

  const handleType = e => {
    setType(e.target.value);
  };
  const getMovies = async () => {
    try {
      console.log(type);
      const res = await axios.get(`/movies/type?type=${type}`);
      //const res = await axios.get("/movies");
      setMovies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h1>{title}</h1>
      </div>
      <form>
        <div className={styles.addContentItem}>
          <label>Title</label>
          <input
            type="text"
            placeholder=""
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className={styles.addContentItem}>
          <label>Type</label>
          <select name="types" onChange={handleChange} onClick={handleType}>
            <option value=" ">Type</option>
            <option value="movies">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>

        <div className={styles.addContentItem}>
          <label>Content</label>
          <select
            multiple
            name="movies"
            onChange={handleSelect}
            style={{ height: "280px" }}
          >
            {movies.map(movie => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <button className={styles.addContentButton} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default ListForm;
