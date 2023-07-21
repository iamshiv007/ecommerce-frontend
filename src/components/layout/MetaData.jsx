import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const MetaData = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title> {title} </title>
      </Helmet>
    </HelmetProvider>
  );
};
