import { AccountBalance, LibraryAdd, LocalShipping } from "@mui/icons-material";
import React, { Fragment } from "react";
import "./CheckoutSteps.css";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";

export const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAdd />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalance />,
    },
  ];

  const stepStyle = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            complete={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};
