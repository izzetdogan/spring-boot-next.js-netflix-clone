import styles from "./movie.module.css";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { DeleteOutline } from "@mui/icons-material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

export default function Movie({ movies }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const deleteMovie = async id => {
    try {
      await axios.delete("/movies/" + id, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      });
      refreshData();
      toast.success("The movie has deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: params => {
        return (
          <div className={styles.movieListItem}>
            <img
              className={styles.movieListImg}
              src={params.row.movieImage}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "genres",
      headerName: "Genre",
      width: 170,
      valueGetter: params => params.row.genres.map(a => a.genre),
    },
    {
      field: "year",
      headerName: "Year",
      width: 120,
    },
    { field: "isMovie", headerName: "isMovie", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,

      renderCell: params => {
        return (
          <>
            <Link href={"/movies/" + params.row.id}>
              <button className={styles.movieListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={styles.movieListDelete}
              onClick={() => deleteMovie(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="contentList">
      <div>
        <Link href="/movies/new">
          <button className="contentAddButton">New Movie</button>
        </Link>
      </div>

      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/movies`);
  const movies = await res.json();
  return {
    props: {
      movies,
    },
  };
}
