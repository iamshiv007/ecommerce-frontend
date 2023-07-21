import React, { Fragment, useState, useEffect } from "react";
import { Loader } from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Lock, LockOpen } from "@mui/icons-material";
import { MetaData } from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../featured/actions/userActions";
import { clear_errors } from "../../featured/slices/passwordSlice";
import "./ResetPassword.css";

export const ResetPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { token } = useParams();

  const { error, success, loading } = useSelector((state) => state.password);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }

    if (success) {
      alert("Password Updated Successfully");

      navigate("/login");
    }
  }, [error, dispatch, navigate, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>
              <form
                onSubmit={resetPasswordSubmit}
                className="resetPasswordForm"
              >
                <div className="">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
