import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import { CheckoutSteps } from "./CheckoutSteps";
import {
  Home,
  LocationCity,
  Phone,
  PinDrop,
  Public,
  TransferWithinAStation,
} from "@mui/icons-material";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import "./Shipping.css";
import { saveShippingInfo } from "../../featured/actions/cartActions";

export const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert("Phone Number should be 10 digits long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <div className="shippingHeading">Shipping Details</div>

          <form
            onSubmit={shippingSubmit}
            className="shippingForm"
            encType="multipart/form-data"
          >
            <div>
              <Home />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDrop />
              <input
                value={pinCode}
                placeholder="Pin Code"
                type="number"
                required
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <Phone />
              <input
                type="number"
                placeholder="Phone No"
                value={phoneNo}
                required
                onChange={(e) => setPhoneNo(e.target.value)}
                size={10}
              />
            </div>

            <div>
              <Public />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Coutry</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStation />
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};
