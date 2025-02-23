import React from "react";
import { Box, Button, Container, Typography, TextField, InputAdornment } from "@mui/material";
import Logo from "../assets/pizza-logo.svg";
import EuroIcon from "@mui/icons-material/Euro";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Header: React.FC = () => {
  return (
    <Container maxWidth="lg">
      {/* Logo and Title Section */}
      <Box display="flex" alignItems="center" justifyContent="space-between" py={2}>
        
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <img src={Logo} alt="logo" width={60} height={60} />
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
        <Box width="250px">
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search pizza"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Cart Button */}
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
          >
            10 <EuroIcon fontSize="small" /> | <ShoppingCartOutlinedIcon fontSize="small" /> 3
          </Button>
        </Box>

      </Box>
    </Container>
  );
};

export default Header;
