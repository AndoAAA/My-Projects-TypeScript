import { Box } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <Box>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
