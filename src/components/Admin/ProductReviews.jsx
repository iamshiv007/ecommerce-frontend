import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "./Sidebar";
import { MetaData } from "../layout/MetaData";
import { Delete, Star } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductReviews.css";
import { useNavigate } from "react-router-dom";
import {
  clear_errors,
  deleteReviewReset,
} from "../../featured/slices/reviewSlices";
import { clear_errors as reviewsClearError } from "../../featured/slices/reviewsSlice";
import {
  deleteReview,
  getAllReviews,
} from "../../featured/actions/productActions";
import { Button } from "@mui/material";

export const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, reviewDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert(error);
      dispatch(reviewsClearError());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clear_errors());
    }

    if (reviewDeleted) {
      alert("Product Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch(deleteReviewReset());
    }
  }, [dispatch, error, productId, reviewDeleted, deleteError, navigate]);

  const columns = [
    { field: "id", headerName: "Review Id", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 180,
      flex: 0.4,
      type: "number",
      cellClassName: (params) => {
        return params.rating >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.id)
              }
            >
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.user,
        rating: item.rating,
        comment: item.comment,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS -- Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">All Reviews</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <div className="productReviewsFormHeading">No Reviews Found</div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
