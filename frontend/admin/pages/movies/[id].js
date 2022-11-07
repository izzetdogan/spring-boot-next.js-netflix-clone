import styles from "./movie.module.css";
import { useState, useEffect } from "react";
import MovieForm from "../../components/forms/movieForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
export default function Movie() {
  const [checkControl, setChecked] = useState([]);
  const [updateMovie, setUpdateMovie] = useState({});
  const [editMovie, setEditMovie] = useState({});
  const [edited, setEdited] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [movie, setMovie] = useState({});
  const router = useRouter();

  useEffect(() => {
    console.log("dhdhdhd", router.query.id);
    const getMoviee = async () => {
      try {
        const res = await axios.get(`movies/${router.query.id}`);
        setMovie(res.data);
        setEditMovie(res.data);
        setUpdateMovie(res.data);
        console.log("sdjckldvc", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMoviee();
  }, [edited]);

  const handleChange = async e => {
    const value = e.target.value;
    setUpdateMovie({ ...updateMovie, [e.target.name]: value });
  };

  const handleCheckBox = e => {
    setIsChecked(true);
    const value = e.target.value;
    if (e.target.checked) {
      setChecked([...checkControl, { genre: value }]);
    } else {
      setChecked(checkControl.filter(data => data.genre !== e.target.value));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    isChecked
      ? (updateMovie.genres = checkControl)
      : (updateMovie.genres = movie.genres);
    console.log(updateMovie);
    try {
      const res = await axios.put(`/movies/${movie.id}`, updateMovie);
      setEdited(edited + 1);
      toast.success("Updated");
      console.log(res.data);
    } catch (err) {
      if (err.response.data.message) {
        toast.warn(err.response.data.message);
      } else {
        toast.warn("Please check the fields");
      }
    }
  };

  const handleOption = e => {
    const value = parseInt(e.target.value);
    setUpdateMovie({ ...updateMovie, [e.target.name]: value });
  };

  return (
    <div className={styles.user}>
      <div className={styles.userTitleContainer}>
        <h1>Edit Movie</h1>
      </div>
      <div className={styles.userContainer}>
        <div className={styles.userShow}>
          <div className={styles.userShowTop}>
            <img
              src={editMovie.movieImage}
              alt=""
              className={styles.userShowImg}
            />
            <div className={styles.userShowTopTitle}>
              <span className={styles.userShowUsername}>{editMovie.title}</span>
            </div>
          </div>
          <div className={styles.userShowBottom}>
            <span className={styles.userShowTitle}>Movie Details</span>
            <div className={styles.userShowInfo}>
              <span className={styles.userShowInfoTitle}>
                Title : {editMovie.title}
              </span>
            </div>
            <div className={styles.userShowInfo}>
              <span className={styles.userShowInfoTitle}>
                Descrirption: {editMovie.description}
              </span>
            </div>

            <div className={styles.userShowInfo}>
              <span className={styles.userShowInfoTitle}>
                Genre:{" "}
                {editMovie &&
                  editMovie.genres &&
                  editMovie.genres.map(genre => (
                    <span key={genre.id}>-{genre.genre}</span>
                  ))}
              </span>
            </div>
            <div className={styles.userShowInfo}>
              <span className={styles.userShowInfoTitle}>
                Year : {editMovie && editMovie.year && editMovie.year}
              </span>
            </div>
            <div className={styles.userShowInfo}>
              <span className={styles.userShowInfoTitle}>
                Type : {movie && movie.isMovie == true ? "Movie" : "Series"}
              </span>
            </div>
            <div className={styles.userShowInfo}>
              <span className={styles.userShowInfoTitle}>
                Movie-Url : {editMovie.movieUrl}
              </span>
            </div>
            <div className={styles.userShowInfo}>
              <span className={styles.userShowInfoTitle}>
                Trailer: {editMovie.trailer}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.userUpdate}>
          <span className={styles.userUpdateTitle}>Edit</span>
          <MovieForm
            key={movie.id}
            movie={editMovie}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleOption={handleOption}
            handleCheckBox={handleCheckBox}
            setMovie={setUpdateMovie}
          />
        </div>
      </div>
    </div>
  );
}
