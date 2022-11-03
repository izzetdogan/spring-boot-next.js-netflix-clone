import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Poster from "../components/Poster";
import axios from "axios";
import { Genre, List, Movie } from "../typing";
import { GenreContext } from "../context/GenreContext";
import Lists from "../components/Lists";
import { UserContext } from "../context/UserContext";

interface IProps {
  posterMovie: Movie;
  genreList: [Genre];
}

const Home = ({ posterMovie, genreList }: IProps) => {
  const [liste, setListe] = useState<[List]>();
  const currentGenre = useContext(GenreContext);
  const router = useRouter();
  const currentType = router.asPath.substring(1);
  const state = useContext(UserContext);
  //const findCurrentGenre =currentGenre?.currentGenre === null ? "" : currentGenre?.currentGenre;

  useEffect(() => {
    if (state?.state == null) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const getListe = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/lists/genre/?type=${currentType}&genre=${currentGenre?.currentGenre}`
        );
        setListe(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getListe();
  }, [currentType, currentGenre?.currentGenre]);
  console.log("state,", state);

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[95vh]  ">
      <Head>
        <title>NetFlix{currentType === "" ? "" : "-" + currentType}</title>
      </Head>
      <Navbar />

      <main className="relative pb-10 pl-4 lg:pl-10  ">
        <Poster posterMovie={posterMovie} genreList={genreList} />

        <section className="md:space-y-10 mt-12">
          {liste && liste.map(l => <Lists key={l.id} list={l} />)}
        </section>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [posterMovie, genreList] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API}/movies/random?type=movies`).then(
      res => res.json()
    ),
    fetch(`${process.env.NEXT_PUBLIC_API}/genre`).then(res => res.json()),
  ]);

  return {
    props: {
      posterMovie,
      genreList,
    },
  };
};
