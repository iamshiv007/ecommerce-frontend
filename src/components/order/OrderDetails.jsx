import React, { useEffect, Fragment } from "react";
import { MetaData } from "../layout/MetaData";
import { Loader } from "../layout/loader/Loader";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, getOrderDsetails } from "../../actions/orderAction";
import { Link, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { getOrderDetails } from "../../featured/actions/orderActions";
import { clear_errors } from "../../featured/slices/orderDetailsSlice";

export const OrderDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />

          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order # {order && order._id}
              </Typography>
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
                        ? "grenColor"
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
                      order?.orderStatus && order?.orderStatus === "Delivered"
                        ? "greanColor"
                        : "redColor"
                    }
                  >
                    {order?.orderStatus && order?.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order?.orderItems &&
                  order?.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X {item.price} =
                        <b>${item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
