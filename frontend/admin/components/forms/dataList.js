import React, { useEffect } from "react";
import styles from "./form.module.css";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const DataList = ({ lists }) => {
  const [movies, setMovies] = useState([]);
  const [changed, setChanged] = useState(0);
  const [type, setType] = useState(lists.types);
  const [editList, setEditList] = useState(lists);
  const router = useRouter();
  useEffect(() => {
    const findList = async () => {
      try {
        const res = await axios.get(`/lists/${router.query.id}`);
        setEditList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    setType(lists.types);
    findList();
    getMovies();
  }, [changed]);

  const getMovies = async () => {
    try {
      const res = await axios.get(`/movies/type?type=${type}`);
      setMovies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToList = async id => {
    try {
      const res = await axios.patch(`lists/add-list/${lists.id}/movie/${id}`);
      setChanged(changed + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const removeToList = async id => {
    try {
      const res = await axios.patch(
        `lists/remove-list/${lists.id}/movie/${id}`
      );
      setChanged(changed - 1);
    } catch (err) {
      console.log(err);
    }
  };
  const columnListMovie = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: params => {
        return (
          <>
            <DeleteOutlineOutlined
              className="contentListDelete"
              onClick={() => removeToList(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const columnMovie = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: params => {
        return (
          <>
            <button
              onClick={() => addToList(params.row.id)}
              className="contentListEdit"
            >
              Add-To-List
            </button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className={styles.addContentItem}>
        <h2>
          {editList.title}---{editList.types}
        </h2>
      </div>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={6}>
          {movies && (
            <DataGrid
              rows={movies}
              autoHeight
              disableSelectionOnClick
              columns={columnMovie}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          )}
        </Grid>
        <Grid item xs={5}>
          {editList && editList.movies && (
            <DataGrid
              autoHeight
              rows={editList.movies}
              disableSelectionOnClick
              columns={columnListMovie}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DataList;
