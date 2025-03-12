import { Box, Button, Container, Typography } from "@mui/material";
import Logo from "../assets/pizza-logo.svg";
import EuroIcon from "@mui/icons-material/Euro";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        py={2}
        gap={2}
      >
        {/* Logo & Title */}
        <Box display="flex" alignItems="center" flex="1" minWidth="180px">
          <NavLink to="/">
            <img
              src={Logo}
              alt="logo"
              style={{ cursor: "pointer", width: 50, height: 50 }}
            />
          </NavLink>
          <Box ml={2}>
            <Typography variant="h6" fontWeight="bold">
              DODO PIZZA
            </Typography>
            <Typography variant="body2" color="textSecondary">
              The most delicious pizza in the universe
            </Typography>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box
          width={{ xs: "100%", sm: "60%", md: "40%" }}
          order={{ xs: 3, sm: 2 }}
        >
          <Search />
        </Box>

        {/* Cart Button */}
        <Box order={{ xs: 2, sm: 3 }} minWidth="120px">
          <NavLink to="/cart" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "orange",
                borderRadius: "30px",
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.8rem", sm: "1rem" },
                "&:hover": { bgcolor: "darkorange" },
                width: "100%",
                justifyContent: "center",
              }}
              aria-label="Go to cart"
            >
              <EuroIcon fontSize="small" />
              {totalPrice?.toFixed(2) || "0.00"} |
              <ShoppingCartOutlinedIcon fontSize="small" />
              {items.length}
            </Button>
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
