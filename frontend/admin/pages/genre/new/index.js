import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import GenreForm from "../../../components/forms/genreForm";
export default function NewGenre() {
  const [genre, setGenre] = useState(null);

  const handleChange = e => {
    const value = e.target.value;
    setGenre({ ...genre, [e.target.name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(genre);
    try {
      const res = await axios.post("/genre", genre);
      toast.success("Genre saved successfully ");
    } catch (err) {
      if (err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <GenreForm
      title="New"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
