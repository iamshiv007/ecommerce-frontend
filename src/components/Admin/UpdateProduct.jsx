import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import {
  AccountTree,
  AttachMoney,
  Description,
  Spellcheck,
  Storage,
} from "@mui/icons-material";
// import {
//   clearErrors,
//   getProductDetails,
//   updateProduct,
// } from "../../actions/productAction";
import { Sidebar } from "./Sidebar";
import "./NewProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import {
  clear_errors,
  updateProductReset,
} from "../../featured/slices/UpdateProductSlice";
import {
  productDetailsReset,
  clear_errors as productDetails_clear_error,
} from "../../featured/slices/productDetailsSlices";
import {
  getProductDetails,
  updateProduct,
} from "../../featured/actions/productActions";

export const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const { product, error } = useSelector((state) => state.productDetails);
  const {
    loading,
    productUpdated,
    error: updateError,
  } = useSelector((state) => state.updateProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  useEffect(() => {
    if (!product || product === {}) {
      dispatch(getProductDetails(id));
    } else if(product && product._id !== id){
      dispatch(getProductDetails(id));
    }
     else {
      setName(product?.name || "");
      setPrice(product?.price || 0);
      setDescription(product?.description || "");
      setCategory(product?.category || "");
      setStock(product?.stock || 0);
      setOldImages(product?.images || "");
    }

    if (error) {
      alert(error);
      dispatch(productDetails_clear_error());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clear_errors());
    }

    if (productUpdated) {
      alert("Product Updated Successfully");
      navigate("/admin/products");
      dispatch(productDetailsReset());
      dispatch(updateProductReset());
    }
    // eslint-disable-next-line
  }, [dispatch, error, productUpdated, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    const token = localStorage.getItem("token");

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category || "");
    myForm.set("stock", stock);
    myForm.set("token", token);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    // setImages([])
    // setImagesPreview([])
    // setOldImages([])

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
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            encType="multipart/form-data"
            className="createProductForm"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Edit Product</h1>

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
                value={price}
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                accept="images/*"
                onChange={updateProductImagesChange}
                multiple
                name="Avatar"
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
