import { useEffect, useState } from "react";
import styles from "./form.module.css";
import axios from "axios";
import { Checkbox } from "@mui/material";
const MovieForm = ({
  handleChange,
  handleSubmit,
  movie,
  handleOption,
  handleCheckBox,
  setMovie,
}) => {
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);

  const handleImage = async e => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    try {
      const res = await axios.post("/movies/file/upload", formData);
      setMovie({ ...movie, movieImage: res.data });
      console.log("resdataim", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getYear = async () => {
    try {
      const res = await axios.get("/movie/years");
      setYears(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getGenre = async () => {
    try {
      const res = await axios.get("/genre");
      setGenres(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getGenre();
    getYear();
  }, [movie]);
  return (
    <form className={styles.addContentForm}>
      <div className={styles.addContentItem}>
        <label>Image</label>
        <input type="file" id="file" name="file" onChange={handleImage} />
      </div>
      <div className={styles.addContentItem}>
        <label>Title</label>
        <input
          type="text"
          placeholder={movie ? movie.title : "Movie-Title"}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className={styles.addContentItem}>
        <label>Description</label>
        <input
          type="text"
          placeholder={movie ? movie.description : "Description"}
          name="description"
          onChange={handleChange}
        />
      </div>
      <div className={styles.addContentItem}>
        <label>TrailerUrl</label>
        <input
          type="text"
          placeholder={movie ? movie.trailer : "Trailer"}
          name="trailer"
          onChange={handleChange}
        />
      </div>
      <div className={styles.addContentItem}>
        <label>MovieUrl</label>
        <input
          type="text"
          placeholder={movie ? movie.movieUrl : "Movie-Url"}
          name="movieUrl"
          onChange={handleChange}
        />
      </div>
      <div className={styles.addContentItem}>
        <label>Year</label>
        <select name="year" onChange={handleOption}>
          <option>Choose A year</option>
          {years &&
            years.map((y, index) => (
              <option key={index} value={y.year}>
                {y.year}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.genre}>
        {genres &&
          genres.map((g, index) => (
            <div className={styles.genreItem}>
              <Checkbox
                key={index}
                value={g.genre}
                onChange={handleCheckBox}
                name="genres"
              />
              {g.genre}
            </div>
          ))}
      </div>

      <div className={styles.addContentItem}>
        <label>Type</label>
        <select name="isMovie" onChange={handleOption}>
          <option> Choose Type</option>
          <option value={1}> Movies</option>
          <option value={0}>Series</option>
        </select>
      </div>

      <div className={styles.addContentItem}>
        <button onClick={handleSubmit} className={styles.addContentButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
