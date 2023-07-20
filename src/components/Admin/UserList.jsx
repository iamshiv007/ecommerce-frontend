import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import { Sidebar } from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./ProductList.css";
import { deleteUser, getAllUsers } from "../../featured/actions/userActions";
import { clear_errors } from "../../featured/slices/usersSlice";
import {
  clear_errors as deleteUserClearErrors,
  deleteUserReset,
} from "../../featured/slices/userSlice";

export const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.users);

  const { error: deleteError, userDeleted } = useSelector(
    (state) => state.user
  );

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(deleteUserClearErrors());
    }

    if (userDeleted) {
      alert("User deleted Successfully");
      navigate("/admin/users");
      dispatch(deleteUserReset());
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, userDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "User Id", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      cellClassName: (params) => {
        return params.role === "Admin" ? "greenColor" : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      type: "number",
      renderCell: (params) => {
        return (
          <Fragment>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={`/admin/user/${params.id}`}>
                <Edit />
              </Link>

              <Button onClick={() => deleteUserHandler(params.id)}>
                <Delete />
              </Button>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title="ALL USERS - Admin" />

      <div className="dashboard">
        <Sidebar />

        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};
