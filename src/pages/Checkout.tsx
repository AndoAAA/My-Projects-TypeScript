import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { clearItems } from "../redux/cart/cartSlice";

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Handle Form Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation
  const isFormValid =
    form.name.trim() &&
    form.email.trim().includes("@") &&
    form.address.trim() &&
    form.phone.trim().length >= 8;

  // Handle Checkout Submission
  const handleCheckout = () => {
    if (!isFormValid) {
      alert("Please fill in all fields correctly!");
      return;
    }
    alert(`Order placed! Thank you, ${form.name}!`);
    dispatch(clearItems());
    navigate("/");
  };

  return (
    <Box sx={{ p: 3, maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Checkout
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 3, color: "gray", fontStyle: "italic" }}>
          Your cart is empty! 🛒
        </Typography>
      ) : (
        <>
          {/* Cart Summary */}
          <Box sx={{ my: 2, textAlign: "left", p: 2, bgcolor: "#f9f9f9", borderRadius: "10px" }}>
            <Typography variant="h6">Order Summary:</Typography>
            {cartItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 1,
                  p: 1,
                  borderBottom: "1px solid #ddd",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: "50px", height: "50px", borderRadius: "8px" }}
                />
                <Box sx={{ flex: 1, textAlign: "left", ml: 2 }}>
                  <Typography variant="body1">
                    {item.name} ({item.size} cm - {item.type})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.count} x {item.price}€
                  </Typography>
                </Box>
              </Box>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>
              <b>Total:</b> {totalPrice.toFixed(2)}€
            </Typography>
          </Box>

          {/* Checkout Form */}
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              name="name"
              variant="outlined"
              fullWidth
              required
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              name="phone"
              type="tel"
              variant="outlined"
              fullWidth
              required
              value={form.phone}
              onChange={handleChange}
            />
            <TextField
              label="Delivery Address"
              name="address"
              variant="outlined"
              fullWidth
              required
              value={form.address}
              onChange={handleChange}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: isFormValid ? "orange" : "gray",
                borderRadius: "30px",
                px: 4,
                "&:hover": { bgcolor: isFormValid ? "darkorange" : "gray" },
              }}
              disabled={!isFormValid}
              onClick={handleCheckout}
            >
              Confirm Order
            </Button>

            

            <Button
              variant="contained"
              color="inherit"
              sx={{
                borderRadius: "30px",
                px: 4,
              }}
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Checkout;
