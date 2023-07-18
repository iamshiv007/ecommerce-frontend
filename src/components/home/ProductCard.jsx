import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating name="read-only" value={product.ratings} readOnly />
        <span className="productCardSpan">
          ({product.numOfReviews}, Reviews)
        </span>
      </div>
      <span>${product.price}</span>
    </Link>
  );
};