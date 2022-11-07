import styles from "./movie.module.css";
import { useState, useEffect } from "react";
import MovieForm from "../../components/forms/movieForm";
import axios from "axios";
import { toast } from "react-toastify";
export default function Movie({ movie }) {
  const [checkControl, setChecked] = useState([]);
  const [updateMovie, setUpdateMovie] = useState(movie);
  const [editMovie, setEditMovie] = useState(movie);
  const [edited, setEdited] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getMovie();
  }, [edited]);

  const getMovie = () => {
    setEditMovie(updateMovie);
  };
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
                  editMovie.genres.map(genre => <span>-{genre.genre}</span>)}
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

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/movies`);
  const movies = await res.json();
  const paths = movies.map(movie => {
    return {
      params: {
        id: movie.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/movies/${params.id}`);
  const movie = await res.json();
  return {
    props: {
      movie,
    },
  };
}
