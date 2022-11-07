/* eslint-disable @next/next/no-img-element */
import { DeleteOutlineOutlined } from "@mui/icons-material";
import Link from "next/link";
import styles from "./user.module.css";
import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function UserList({ users }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const deleteUser = async id => {
    try {
      await axios.delete("/users/" + id, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      });
      refreshData();
      toast.success("The user has deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: params => {
        return (
          <div className={styles.userListUser}>
            <img
              className={styles.userListImg}
              src={params.row.avatar}
              alt=""
            />
            {params.row.email}
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "isAdmin", headerName: "Admin", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: params => {
        return (
          <>
            <Link href="/users/[id]" as={`/users/${params.row.id}`}>
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
        <Link href="/users/new">
          <button className="contentAddButton">New User</button>
        </Link>
      </div>

      <DataGrid
        rows={users}
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users?newUsers=false`
  );
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
}
