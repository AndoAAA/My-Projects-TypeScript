import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EuroIcon from "@mui/icons-material/Euro";

type CartItemProps = {
  id: number,
  name: string,
  imageUrl: string,
  price: number,
  quantity: number,
  onIncrease: () => void,
  onDecrease: () => void,
  onRemove: () => void,
};

const CartItem: React.FC <CartItemProps> = ({
  name,
  imageUrl,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      borderBottom="1px solid #ddd"
      sx={{ gap: 2, flexWrap: "wrap" }}
    >
      {/* Pizza Image */}
      <Box display="flex" alignItems="center" gap={2} flex={1}>
        <img
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          style={{ borderRadius: "8px" }}
        />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
          <Typography color="textSecondary">
            {price} <EuroIcon fontSize="small" />
          </Typography>
        </Box>
      </Box>

      {/* Quantity Controls */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={onDecrease} disabled={quantity <= 1}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="h6" mx={1}>
          {quantity}
        </Typography>
        <IconButton onClick={onIncrease}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Total Price & Remove Button */}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h6">
          {(price * quantity).toFixed(2)} <EuroIcon fontSize="small" />
        </Typography>
        <Button variant="contained" color="error" onClick={onRemove}>
          <DeleteIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default CartItem;
