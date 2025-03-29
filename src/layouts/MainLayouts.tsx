import { Box } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayouts: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayouts;
