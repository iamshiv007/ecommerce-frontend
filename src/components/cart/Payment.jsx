import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CheckoutSteps } from "./CheckoutSteps";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import "./Payment.css";
import axios from "axios";
import { MetaData } from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { newOrder } from "../../featured/actions/orderActions";
import { clear_errors } from "../../featured/slices/orderSlice";

export const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef();
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const PORT = process.env.REACT_APP_BACKEND_URL;

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const { data } = await axios.post(
        `${PORT}/api/payment/process`,
        paymentData
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(newOrder(order));

          navigate("/success");
        } else {
          alert("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clear_errors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title="Payment" />

      <CheckoutSteps activeStep={2} />

      <div className="paymentContainer">
        <form onSubmit={(e) => submitHandler(e)} className="paymentForm">
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};
