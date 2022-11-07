import axios from "axios";
import { useState } from "react";

import { toast } from "react-toastify";
import GenreForm from "../../components/forms/genreForm";

export default function GenreEdit({ genre }) {
  const [updateGenre, setUpdateGenre] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(`/genre/${genre.id}`, updateGenre, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      toast.success("Updated");
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = e => {
    const value = e.target.value;
    setUpdateGenre({ ...updateGenre, [e.target.name]: value });
  };

  return (
    <GenreForm
      title="Edit"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      genre={genre}
    />
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/genre`);
  const genres = await res.json();
  const paths = genres.map(genre => {
    return {
      params: {
        id: genre.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/genre/${params.id}`);
  const genre = await res.json();
  return {
    props: {
      genre,
    },
  };
}
