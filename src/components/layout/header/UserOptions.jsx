import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import "./Header.css";

export const UserOptions = () => {
  const navigate = useNavigate();

  const options = [
    {
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    },
  ];

  function dashboard() {
    navigate("/admin/dashboard");
  }

  return (
    <Fragment>
      <div className="userOptionsContainer">
        <Box sx={{ height: 150, transform: "translateZ(0px)", flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            direction="down"
          >
            {options.map((option) => (
              <SpeedDialAction
                key={option.name}
                icon={option.icon}
                tooltipTitle={option.name}
                onClick={option.func}
              />
            ))}
          </SpeedDial>
        </Box>
      </div>
    </Fragment>
  );
};
