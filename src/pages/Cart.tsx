import React, { useMemo, useCallback, useState } from "react";
import { Box, Container, Typography, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearItems } from "../redux/cart/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems, totalPrice } = useSelector((state: RootState) => state.cart);
  const [openDialog, setOpenDialog] = useState(false);

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const handleClearCart = useCallback(() => {
    dispatch(clearItems());
    setOpenDialog(false);
  }, [dispatch]);

  const cartItemsList = useMemo(() => 
    cartItems.map((item) => <CartItem key={item.id} {...item} />), 
    [cartItems]
  );

  return (
    <Container maxWidth="md">
      {/* Cart Title with Icon */}
      <Box display="flex" alignItems="center" justifyContent="center" gap={1} my={3}>
        <ShoppingCartOutlinedIcon fontSize="large" />
        <Typography variant="h4" fontWeight="bold">Your Cart</Typography>
      </Box>

      {/* If cart is empty */}
      {cartItems.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" color="textSecondary">Your cart is empty 😢</Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, bgcolor: "orange", borderRadius: "30px", px: 4, "&:hover": { bgcolor: "darkorange" } }}
            onClick={() => handleNavigation("/")}
          >Back to Home</Button>
        </Box>
      ) : (
        <Box>
          {cartItemsList}

          {/* Cart Summary */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} p={2} bgcolor="#f5f5f5" borderRadius="8px" flexWrap="wrap" gap={2}>
            <Typography variant="h5" fontWeight="bold">
              Total: {totalPrice ? totalPrice.toFixed(2) : "0.00"} €
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap">
              <Button variant="contained" sx={{ bgcolor: "orange", borderRadius: "30px", px: 4, "&:hover": { bgcolor: "darkorange" } }} onClick={() => handleNavigation("/checkout")}>Checkout</Button>
              <Button variant="outlined" sx={{ borderColor: "darkorange", color: "darkorange", borderRadius: "30px", px: 4, "&:hover": { bgcolor: "darkorange", color: "white" } }} onClick={() => setOpenDialog(true)}>Clear Cart</Button>
              <Button variant="contained" color="inherit" sx={{ borderRadius: "30px", px: 4 }} onClick={() => handleNavigation("/")}>Back to Home</Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Confirmation Dialog for Clear Cart */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure you want to clear your cart?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleClearCart} color="error" variant="contained">Clear</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;