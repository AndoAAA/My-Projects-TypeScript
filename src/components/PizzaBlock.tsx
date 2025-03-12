import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import EuroIcon from "@mui/icons-material/Euro";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CartItem } from "../redux/cart/types";
import { addToCart } from "../redux/cart/cartSlice";

const typesNames = ["thin", "traditional"];
const sizesTypes = [26, 30, 40];

type PizzaBlockProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  name,
  price,
  imageUrl,
  sizes,
  types,
  rating,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id)
  );
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      name,
      price,
      imageUrl,
      type: typesNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addToCart(item))
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 2,
        maxWidth: "350px",
        borderRadius: "10px",
        bgcolor: "#f9f9f9",
        boxShadow: 3,
        margin: "0 auto",
        "@media (max-width: 600px)": {
          maxWidth: "100%",
        },
      }}
    >
      {/* Pizza Image and Title */}
      <Box>
        <img
          src={imageUrl}
          alt={name}
          style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
        />
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
      </Box>

      {/* Crust and Size Selection */}
      <Box sx={{ mt: 2, p: 1, borderRadius: "8px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {typesNames.map((type, index) => (
            <Button
              key={index}
              variant={activeType === index ? "contained" : "outlined"}
              size="small"
              onClick={() => setActiveType(index)}
              sx={{
                border: "none",
                color: activeType === index ? "white" : "black",
                bgcolor: activeType === index ? "orange" : "transparent",
                "&:hover": {
                  bgcolor: activeType === index ? "darkorange" : "#ddd",
                },
              }}
            >
              {type}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          {sizesTypes.map((size, index) => (
            <Button
              key={index}
              variant={activeSize === index ? "contained" : "outlined"}
              size="small"
              onClick={() => setActiveSize(index)}
              sx={{
                border: "none",
                color: activeSize === index ? "white" : "black",
                bgcolor: activeSize === index ? "orange" : "transparent",
                "&:hover": {
                  bgcolor: activeSize === index ? "darkorange" : "#ddd",
                },
              }}
            >
              {size} sm
            </Button>
          ))}
        </Box>
      </Box>

      {/* Price and Add Button */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ flex: 1 }}>
          from {price} <EuroIcon fontSize="small" />
        </Typography>
        <Button
          variant="contained"
          onClick={onClickAdd}
          sx={{
            backgroundColor: "white",
            color: "orange",
            border: "1px solid orange",
            borderRadius: "20px",
            px: 3,
            "&:hover": { backgroundColor: "darkorange", color: "white" },
          }}
        >
          + Add {addedCount > 0 && <i>({addedCount})</i>}
        </Button>
      </Box>
    </Box>
  );
};

export default PizzaBlock;
