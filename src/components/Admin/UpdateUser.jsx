import React, { Fragment, useState, useEffect } from "react";
import { Loader } from "../layout/loader/Loader";
import { MetaData } from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MailOutline, Person, VerifiedUser } from "@mui/icons-material";
import { Sidebar } from "./Sidebar";
import "./Dashboard.css";
import "./NewProduct.css";
import { getUser, updateUser } from "../../featured/actions/userActions";
import {
  clear_errors,
  updateUserReset,
} from "../../featured/slices/userSlice";
import { Button } from "@mui/material";
import { getUserClearErrors, getUserReset } from "../../featured/slices/getUserSlice";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { loading, error, user } = useSelector((state) => state.getUser);

  const {
    loading: updateLoading,
    error: updateError,
    userUpdated,
  } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateUser(id, myForm));
  };

  useEffect(() => {
    if (!user) {
      dispatch(getUser(id));
    } else if (user && user._id !== id) {
      dispatch(getUser(id));
    } else {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setRole(user?.role || "");
    }

    if (error) {
      alert(error);
      dispatch(getUserClearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clear_errors());
    }

    if (userUpdated) {
      alert("User Updated Successfully");
      navigate("/admin/users");
      dispatch(updateUserReset());
      dispatch(getUserReset());
    }
  }, [dispatch, error, userUpdated, navigate, user, updateError, id]);

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <Person />
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  required
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutline />
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUser />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <Button
                type="submit"
                id="createProductBtn"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};
