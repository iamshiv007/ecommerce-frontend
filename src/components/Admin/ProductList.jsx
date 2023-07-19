import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import { Sidebar } from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
// import { clearErrors, deleteProduct, getAdminProduct } from '../../actions/productAction'
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./ProductList.css";
import { Loader } from "../layout/loader/Loader";
import {
  deleteProduct,
  getAdminProducts,
} from "../../featured/actions/productActions";
import { clear_errors } from "../../featured/slices/NewProductSlice";
import {
  clear_errors as delete_clear_errors,
  deleteProductReset,
} from "../../featured/slices/DeleteProductSlice";

export const ProductList = ({}) => {
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);

  const {
    error: deleteError,
    productDeleted,
    loading,
  } = useSelector((state) => state.deleteProduct);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(delete_clear_errors());
    }

    if (productDeleted) {
      alert("Product Deleted Successfully");
      dispatch(deleteProductReset());
      dispatch(getAdminProducts());
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, deleteError, productDeleted]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 240,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      type: "number",
      renderCell: (params) => {
        return (
          <Fragment>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={`/admin/product/${params.id}`}>
                <Edit />
              </Link>

              <Button onClick={() => deleteProductHandler(params.id)}>
                <Delete />
              </Button>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ALL PRODUCTS - Admin" />

          <div className="dashboard">
            <Sidebar />

            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
