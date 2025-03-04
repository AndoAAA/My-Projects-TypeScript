import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearItems } from "../redux/cart/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const navigate = useNavigate();

  const clearCart = () => {
    dispatch(clearItems());
  };
  return (
    <Container maxWidth="md">
      {/* Cart Title with Icon */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        my={3}
      >
        <ShoppingCartOutlinedIcon fontSize="large" />
        <Typography variant="h4" fontWeight="bold">
          Your Cart
        </Typography>
      </Box>

      {/* If cart is empty */}
      {cartItems.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" color="textSecondary">
            Your cart is empty 😢
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "orange",
              borderRadius: "30px",
              px: 4,
              "&:hover": { bgcolor: "darkorange" },
            }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Box>
      ) : (
        <Box>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          {/* Cart Summary */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
            p={2}
            bgcolor="#f5f5f5"
            borderRadius="8px"
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="h5" fontWeight="bold">
              Total: {totalPrice.toFixed(2)} €
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "orange",
                  borderRadius: "30px",
                  px: 4,
                  "&:hover": { bgcolor: "darkorange" },
                }}
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </Button>
              <Button
                onClick={clearCart}
                variant="outlined"
                sx={{
                  borderColor: "darkorange",
                  color: "darkorange",
                  borderRadius: "30px",
                  px: 4,
                  "&:hover": { bgcolor: "darkorange", color: "white" },
                }}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="inherit"
                sx={{ borderRadius: "30px", px: 4 }}
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
