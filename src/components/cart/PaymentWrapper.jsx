import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Payment } from "./Payment";

const PaymentWrapper = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/stripeApiKey`
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  if (!stripeApiKey) {
    return <div>Loading...</div>; // You can display a loading spinner or message here
  }

  const stripePromise = loadStripe(stripeApiKey);

  return (
    <div>
      {stripeApiKey && (
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
      )}
    </div>
  );
};

export default PaymentWrapper;
