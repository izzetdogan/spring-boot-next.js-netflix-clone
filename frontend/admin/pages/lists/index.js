import { DeleteOutlineOutlined } from "@mui/icons-material";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function UserList({ lists }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const deleteUser = async id => {
    try {
      await axios.delete("/lists/" + id, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      });
      refreshData();
      toast.success("The list has  deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },

    { field: "title", headerName: "Title", width: 200 },
    { field: "types", headerName: "Type", width: 200 },
    {
      field: "movies",
      headerName: "Movies.Length",
      width: 170,
      valueGetter: params => params.row.movies.length,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: params => {
        return (
          <>
            <Link href="/lists/[id]" as={`/lists/${params.row.id}`}>
              <button className="contentListEdit">Edit</button>
            </Link>
            <DeleteOutlineOutlined
              className="contentListDelete"
              onClick={() => deleteUser(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="contentList">
      <div>
        <Link href="/lists/new">
          <button className="contentAddButton">New List</button>
        </Link>
      </div>

      <DataGrid
        rows={lists}
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/lists`);
  const lists = await res.json();
  return {
    props: {
      lists,
    },
  };
}
