import React from "react";
import { Box, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Nav = () => {
  return (
    <Box>
      <Box>
        <LocalShippingIcon />
      </Box>
      <Box>
        <Typography>Free Shipping When Shipping up to $1000</Typography>
      </Box>
    </Box>
  );
};

export default Nav;
