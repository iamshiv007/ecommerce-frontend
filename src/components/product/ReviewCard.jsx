import React from "react";
import profilePng from "../../images/Profile.png";
import { Rating } from "@mui/material";

export const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating name="read-only" value={review.rating} readOnly />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};
