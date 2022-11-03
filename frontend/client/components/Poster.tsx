import { Genre, Movie } from "../typing";
import { MdPlayArrow, MdInfoOutline } from "react-icons/md";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GenreContext } from "../context/GenreContext";
import BasicModal from "./Modal";
interface IProps {
  posterMovie: Movie;
  genreList: [Genre];
}

// export const Posterr: React.FC<IProps> = props => {
//   return <>
//   {props.genreList}
//   </>;
// };

const Poster = ({ posterMovie, genreList }: IProps) => {
  const router = useRouter().asPath;
  const currentGenre = useContext(GenreContext);
  return (
    <div key={posterMovie.id} className="p-0 ">
      {router !== "/" && (
        <div className="flex  space-x-4 pt-20 z-20   ">
          <h1 className="font-bold  md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
            {router.substring(1)}
          </h1>
          <select
            className="cursor-pointer mt-1 text-sm  bg-black center items-center border-[1px] rounded-sm border-[#fff]  "
            onChange={e => currentGenre?.setCurrentGenre(e.target.value)}
          >
            <option value="">All</option>
            {genreList &&
              genreList.map(genre => (
                <option key={genre.id} value={genre.genre}>
                  {genre.genre}
                </option>
              ))}
          </select>
        </div>
      )}
      <div className="flex flex-col   space-y-4 py-10 md:space-py-4 lg:h-[65vh] lg:justify-end lg:pb-12">
        <div className="absolute  top-0 left-0 -z-10 h-[95vh] ">
          <img src={posterMovie.movieImage} className="h-[95vh] w-[100vw]" />
          {/*<Image src={posterMovie.movieImage} layout="fill" />*/}
        </div>
        <h1 className="text-2xl font-bold md:text-3xl lg:text-7xl">
          {posterMovie.title}
        </h1>
        <p className="max-w-xs text-xs  md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
          {posterMovie.description}
        </p>

        <div className="flex space-x-3 ">
          <button className="navbarButton bg-white text-black">
            <MdPlayArrow />
            Play
          </button>
          <div className="navbarButton bg-gray-400 text-black">
            <BasicModal movie={posterMovie} />
            <span className="-mt-1 -ml-10 text-white">Info</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
