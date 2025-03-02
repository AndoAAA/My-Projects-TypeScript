import { Box, Button, Container, Typography } from "@mui/material";
import Logo from "../assets/pizza-logo.svg";
import EuroIcon from "@mui/icons-material/Euro";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import React from "react";

type HeaderProps = {
  totalPrice: number;
  cartItems: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const Header: React.FC<HeaderProps> = ({
  totalPrice,
  cartItems,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <Container maxWidth="lg">
      {/* Logo and Title Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={2}
        flexWrap="wrap"
        gap={2}
      >
        {/* Logo */}
        <Box display="flex" alignItems="center" flex="1">
          <NavLink to="/">
            <img
              src={Logo}
              alt="logo"
              width={60}
              height={60}
              style={{ cursor: "pointer" }}
            />
          </NavLink>
          <Box ml={2}>
            <Typography variant="h5" fontWeight="bold">
              DODO PIZZA
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              The most delicious pizza in the universe
            </Typography>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box
          width={{ xs: "100%", sm: "250px", md: "300px" }}
          mb={{ xs: 2, sm: 0 }}
        >
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Box>

        {/* Cart Button */}
        <NavLink to="/cart">
          <Box>
            <Button
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "orange",
                borderRadius: "30px",
                px: 3,
                "&:hover": { bgcolor: "darkorange" },
              }}
              aria-label="Go to cart"
            >
              {totalPrice} <EuroIcon fontSize="small" /> |{" "}
              <ShoppingCartOutlinedIcon fontSize="small" /> {cartItems}
            </Button>
          </Box>
        </NavLink>
      </Box>
    </Container>
  );
};

export default Header;
