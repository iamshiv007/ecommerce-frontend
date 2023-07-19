import React, { useState, useEffect, Fragment } from "react";
import { Loader } from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import Carousel from "react-material-ui-carousel";
import { ReviewCard } from "./ReviewCard";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import {
  getProductDetails,
  newReview,
} from "../../featured/actions/productActions";
import { clear_errors as review_clear_errors } from "../../featured/slices/reviewSlices";
import { newReviewReset } from "../../featured/slices/reviewSlices";
import { addToCart } from "../../featured/actions/cartActions";
import "./ProductDetails.css";
import { clear_errors } from "../../featured/slices/productDetailsSlices";

export const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { reviewCreated, error: reviewError } = useSelector(
    (state) => state.review
  );

  const { error: userError, user } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product?.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity));
    alert("Item Added To cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    // if (props.location !== prevProps.location) {
    //   window.scrollTo(0, 0);
    // }

    if (error) {
      alert(error);
      dispatch(clear_errors());
    }

    if (reviewError) {
      alert(reviewError);
      dispatch(review_clear_errors());
    }

    if (reviewCreated) {
      alert("Review Submitted Successufully");
      dispatch(newReviewReset());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, reviewCreated, userError]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {userError || !user ? (
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                style={{ position: "fixed", top: "2%", right: "2%" }}
              >
                LogIn
              </Button>
            </Link>
          ) : (
            ""
          )}
          <MetaData title={`${product?.name} -- ECOMMEREC`} />
          <div className="productDetails">
            <div>
              <Carousel>
                {product?.images &&
                  product?.images.map((item, i) => (
                    <img
                      className="carouselImage"
                      src={item.url}
                      alt={`${i}} Slide`}
                      key={i}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product?.name}</h2>
                <p>Product # {product?._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating name="read-only" value={product?.ratings} readOnly />
                <span className="detailsBlock-2-span">
                  ({product?.numOfReviews} Reviews)
                </span>
              </div>

              <div className="detailsBlock-3">
                <h1>{product?.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product?.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product?.stock < 1 ? "redColor" : "greenColor"}>
                    {product?.stock < 1 ? "Out Of stock" : "In Stock"}
                  </b>
                </p>
              </div>

              <div className="detailBlock-4">
                Description: <p>{product?.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            arial-label="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <textarea
                type="text"
                placeholder="Write a Comment"
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product?.reviews && product?.reviews[0] ? (
            <div className="reviews">
              {product?.reviews &&
                product?.reviews.map((review) => (
                  <ReviewCard review={review} key={review._id} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
