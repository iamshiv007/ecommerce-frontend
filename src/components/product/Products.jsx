import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Loader } from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import "./Products.css";
import { ProductCard } from "../home/ProductCard";
import { useParams } from "react-router-dom";
import { Pagination, Slider, Typography } from "@mui/material";
import { getAllProducts } from "../../featured/actions/productActions";
import { clear_errors } from "../../featured/slices/productSlices";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

export const Products = () => {
  const dispatch = useDispatch();

  const { products, loading, error, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 125000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState();

  const { keyword } = useParams();

  const setCurrentPageNo = (e, value) => {
    setCurrentPage(value);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }
    dispatch(getAllProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={150000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  key={category}
                  className="category-link"
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography>Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                onChange={setCurrentPageNo}
                page={currentPage}
                color="primary"
                count={
                  count % resultPerPage === 0
                    ? count / resultPerPage
                    : Math.floor(count / resultPerPage) + 1
                }
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
