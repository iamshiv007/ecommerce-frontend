import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import { Sidebar } from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./ProductList.css";
import { deleteOrder, getAllOrders } from "../../featured/actions/orderActions";
import { clear_errors } from "../../featured/slices/ordersSlice";
import {
  clear_errors as deleteClearErrors,
  deleteOrderReset,
} from "../../featured/slices/orderSlice";

export const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.orders);

  const { error: deleteError, orderDeleted } = useSelector(
    (state) => state.order
  );

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(deleteClearErrors());
    }

    if (orderDeleted) {
      alert("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch(deleteOrderReset());
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, orderDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 270,
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
              <Link to={`/admin/order/${params.id}`}>
                <Edit />
              </Link>

              <Button onClick={() => deleteOrderHandler(params.id)}>
                <Delete />
              </Button>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title="ALL ORDERS - Admin" />

      <div className="dashboard">
        <Sidebar />

        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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
  );
};
