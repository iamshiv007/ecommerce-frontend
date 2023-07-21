import React, { Fragment, useEffect, useState } from "react";
import { MetaData } from "../layout/MetaData";
import { Sidebar } from "./Sidebar";
import { Loader } from "../layout/loader/Loader";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AccountTree } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import "./ProcessOrder?.css";
import { updateOrderReset } from "../../featured/slices/orderSlice";
import {
  getOrderDetails,
  updateOrder,
} from "../../featured/actions/orderActions";
import { clear_errors } from "../../featured/slices/ordersSlice";
import { clear_errors as updateClearError } from "../../featured/slices/ordersSlice";

export const ProcessOrder = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { error: updateError, orderUpdated } = useSelector(
    (state) => state.order
  );

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(updateClearError());
    }

    if (orderUpdated) {
      alert("Order Updated Successfully");
      dispatch(updateOrderReset());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, orderUpdated, updateError, id]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order?.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmShippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order?.user && order?.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order?.shippingInfo && order?.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order?.shippingInfo &&
                          `${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.pinCode}, ${order?.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order?.paymentInfo &&
                          order?.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order?.paymentInfo &&
                        order?.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <p>{order?.totalPrice && order?.totalPrice}</p>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order?.orderStatus &&
                          order?.orderStatus === "Delivered"
                            ? "greanColor"
                            : "redColor"
                        }
                      >
                        {order?.orderStatus && order?.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order?.orderItems &&
                      order?.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} X ₹{item.price} =
                            <b>{item.quantity * item.price}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display:
                    order?.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTree />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Status</option>
                      {order?.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order?.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                    type="submit"
                  >
                    process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
