import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MovieForm from "../../../components/forms/movieForm";

export default function NewMovie() {
  const [movie, setMovie] = useState({});
  const [checkControl] = useState([]);

  const handleCheckBox = async e => {
    const value = e.target.value;
    if (e.target.checked) {
      checkControl.push({ genre: value });
    } else {
      for (var i = 0; i < checkControl.length; i++) {
        if (checkControl[i].genre === value) checkControl.splice(i, 1);
      }
    }

    setMovie({ ...movie, [e.target.name]: checkControl });
  };

  const handleChange = e => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleOption = e => {
    const value = parseInt(e.target.value);
    setMovie({ ...movie, [e.target.name]: value });
    console.log(movie);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMovie({ ...movie, genres: [...checkControl] });

    try {
      const res = await axios.post("/movies", movie);
      toast.success("Movie added");
    } catch (err) {
      if (err.response.data.message) {
        toast.warn(err.response.data.message);
      } else {
        toast.warn("Please check the Fields");
        console.log(err);
      }
    }
  };

  return (
    <MovieForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCheckBox={handleCheckBox}
      handleOption={handleOption}
      movie={movie}
      setMovie={setMovie}
    />
  );
}
