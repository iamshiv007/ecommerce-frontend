import React, { Fragment, useState, useEffect } from "react";
import { Loader } from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import {
  AccountTree,
  AttachMoney,
  Description,
  Spellcheck,
  Storage,
} from "@mui/icons-material";
import { Sidebar } from "./Sidebar";
import "./NewProduct.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { newProduct } from "../../featured/actions/productActions";
import {
  clear_errors,
  newProductReset,
  new_product_reset,
} from "../../featured/slices/NewProductSlice";

export const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const { loading, error, productCreated } = useSelector(
    (state) => state.newProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }

    if (productCreated) {
      alert("Product Created Successfully");
      navigate("/");
      dispatch(newProductReset());
    }
  }, [dispatch, error, navigate, productCreated]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(newProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Create Product" />
          <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
              <form
                encType="multipart/form-data"
                className="createProductForm"
                onSubmit={createProductSubmitHandler}
              >
                <h1>Create Product</h1>

                <div>
                  <Spellcheck />
                  <input
                    placeholder="Product Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                  />
                </div>

                <div>
                  <AttachMoney />
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div>
                  <Description />
                  <textarea
                    placeholder="Product Description"
                    required
                    value={description}
                    cols="30"
                    rows="1"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div>
                  <AccountTree />
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Storage />
                  <input
                    type="number"
                    required
                    placeholder="Stock"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div id="createProductFormFile">
                  <input
                    type="file"
                    accept="images/*"
                    onChange={createProductImagesChange}
                    multiple
                    name="Avatar"
                  />
                </div>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Create
                </Button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
