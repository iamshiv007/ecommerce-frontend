import React, { Fragment, useState, useEffect } from "react";
import { Loader } from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
// import "./ResetPassword.css";
import { Lock, LockOpen, VpnKey } from "@mui/icons-material";
import { MetaData } from "../layout/MetaData";
import "./UpdatePassword.css";
import { updatePassword } from "../../featured/actions/userActions";
import {
  clear_errors,
  updatePasswordReset,
} from "../../featured/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const UpdatePassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, passwordUpdated, loading } = useSelector(
    (state) => state.user
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }

    if (passwordUpdated) {
      alert("Password Updated Successfully");

      navigate("/account");

      dispatch(updatePasswordReset());
    }
  }, [error, dispatch, navigate, passwordUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>
              <form
                onSubmit={updatePasswordSubmit}
                className="updatePasswordForm"
              >
                <div className="">
                  <VpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    required
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <Lock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
