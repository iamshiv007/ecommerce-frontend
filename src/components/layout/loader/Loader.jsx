import React from "react";
import "./Loader.css";
import { CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};
