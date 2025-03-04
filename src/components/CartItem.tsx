import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EuroIcon from "@mui/icons-material/Euro";
import { useDispatch } from "react-redux";
import { addToCart, removeItem, minusItem } from "../redux/cart/cartSlice";
import { CartItem as CartItemType } from "../redux/cart/types";

type CartItemProps = {
  id: string;
  name: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  type,
  size,
  price,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch();

  const onClickPlusItem = () => {
    dispatch(addToCart({ id } as CartItemType));
  };

  const onClickMinusItem = () => {
    if (count > 1) {
      dispatch(minusItem(id));
    }
  };

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeItem(id));
    }
  };

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
            {type}, {size} cm
          </Typography>
          <Typography color="textSecondary">
            {price} <EuroIcon fontSize="small" />
          </Typography>
        </Box>
      </Box>

      {/* Quantity Controls */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={onClickMinusItem} disabled={count <= 1}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="h6" mx={1}>
          {count}
        </Typography>
        <IconButton onClick={onClickPlusItem}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Total Price & Remove Button */}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h6">
          {(price * count).toFixed(2)} <EuroIcon fontSize="small" />
        </Typography>
        <Button variant="contained" color="error" onClick={onClickRemove}>
          <DeleteIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default CartItem;
