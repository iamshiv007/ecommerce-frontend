import { MailOutline } from "@mui/icons-material";
import React, { Fragment, useState, useEffect } from "react";
import { Loader } from "../layout/loader/Loader";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../featured/actions/userActions";
import { clear_errors } from "../../featured/slices/passwordSlice";

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, message, loading } = useSelector((state) => state.password);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }

    if (message) {
      alert(message);
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, message, error, isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                action=""
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutline />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
