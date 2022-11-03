import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { DeleteOutline } from "@mui/icons-material";
import styles from "../movies/movie.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function GenreList({ genre }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const handleDelete = async id => {
    try {
      await axios.delete("/genre/" + id, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      });
      toast.info("The genre has deleted");
      refreshData();
    } catch (err) {}
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "genre", headerName: "Genre", width: 290 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: params => {
        return (
          <>
            <Link href={"/genre/" + params.row.id}>
              <button className={styles.movieListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={styles.movieListDelete}
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="contentList">
      <div>
        <Link href="/genre/new">
          <button className="contentAddButton">New Genre</button>
        </Link>
      </div>

      <DataGrid
        rows={genre}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/genre`);
  const genre = await res.json();
  return {
    props: {
      genre,
    },
  };
}
