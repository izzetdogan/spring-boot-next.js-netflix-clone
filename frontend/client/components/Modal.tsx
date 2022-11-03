import * as React from "react";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { MdInfoOutline } from "react-icons/md";
import { Genre, Movie } from "../typing";
import ReactPlayer from "react-player";

interface IProps {
  movie: Movie;
}

export default function BasicModal({ movie }: IProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <MdInfoOutline className="text-[1.5rem] absolute -left-1 -top-3 text-gray-200 " />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <div className=" w-[100%] md:w-[50%] lg:w-[50%] h-[400px] absolute top-[10%] md:left-[25%] bg-black ">
            <ReactPlayer url={movie.movieUrl} width="100%" height="100%" />
            <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
              <div className="flex flex-col">
                <h1>
                  <span className="text-[gray]">Title: </span> {movie.title}
                </h1>
                <h1>
                  <span className="text-[gray]">Desc: </span>{" "}
                  {movie.description}
                </h1>
                <div>
                  {" "}
                  <span className="text-[gray]">Genre: </span>
                  {movie.genres &&
                    movie.genres.map((g: Genre) => <span>{g.genre} </span>)}
                </div>
                {movie.year && movie.year.year == null ? (
                  ""
                ) : (
                  <h1>
                    <span className="text-[gray]">Year: </span>{" "}
                    {movie.year && movie.year.year}
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
