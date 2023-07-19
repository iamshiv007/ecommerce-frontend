import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import { Typography } from "@mui/material";
// import { Doughnut, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { Sidebar } from "./Sidebar";
import { getAdminProducts } from "../../featured/actions/productActions";
import { getAllUsers } from "../../featured/actions/userActions";
import { getAllOrders } from "../../featured/actions/orderActions";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.orders);
  const { users } = useSelector((state) => state.users);

  // eslint-disable-next-line
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
   
  }, [dispatch]);

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  // const lineState = {
  //   labels: ["Initial Amount", "Amount Earned"],
  //   datasets: [
  //     {
  //       label: "TOTAL AMOUNT",
  //       backgroundColor: "tomato",
  //       hoverBackgroundColor: "rgb(197, 72, 49)",
  //       data: [0, totalAmount],
  //     },
  //   ],
  // };

  // const doughnutState = {
  //   labels: ["Out Of Stock", "Instock"],
  //   datasets: [
  //     {
  //       backgroundColor: ["#00A6B4", "#6800B4"],
  //       hoverBackgroundColor: ["#4B5000", "#35014F"],
  //       data: [outOfStock, products.length - outOfStock],
  //     },
  //   ],
  // };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ${totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          {/* <Line data={lineState} /> */}
        </div>

        <div className="doughnutChart">
          {/* <Doughnut data={doughnutState} /> */}
        </div>
      </div>
    </div>
  );
};
