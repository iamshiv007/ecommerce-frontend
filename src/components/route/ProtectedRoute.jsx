import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Loader } from "../layout/loader/Loader";
import { Home } from "@mui/icons-material";
import { LogInSignUp } from "../user/LogInSignUp";

const ProtectedRoute = ({ isAdmin, component, path }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [output, setOutput] = useState(<Loader />);

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      setOutput(<Route exact component={<LogInSignUp />} path="/login" />);
      alert("Please Login To access this resource");
      return;
    } else if (isAdmin && user.role !== "Admin") {
      setOutput(<Route exact component={<Home />} path="/" />);
      alert("Only Admin can access this resource");
      return;
    } else if (
      (!isAdmin && isAuthenticated) ||
      (isAdmin && user.role !== "Admin" && isAuthenticated)
    ) {
      return setOutput(<Route exact component={component} path={path} />);
    } else if (isAuthenticated && path === "login") {
      return setOutput(<Route exact component={<Home />} path="/" />);
    }
  }, []);

  return output;
};

export default ProtectedRoute;
