import { CheckCircle } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";
import { Typography } from "@mui/material";

export const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircle />

      <Typography>Your Order has been Placed Successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};
