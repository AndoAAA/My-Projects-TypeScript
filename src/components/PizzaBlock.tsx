import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import EuroIcon from "@mui/icons-material/Euro";

type PizzaBlockProps = {
  title: string;
  imageUrl: string;
  price: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ title, imageUrl, price }) => {
  const crustTypes = ["Thin", "Traditional"];
  const sizes = [26, 30, 40];

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [addedCount, setAddedCount] = useState(0);

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 2,
        maxWidth: "350px",
        borderRadius: "10px",
        bgcolor: "#f9f9f9",
        boxShadow: 3,
      }}
    >
      {/* Pizza Image and Title */}
      <Box>
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
        />
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      {/* Crust and Size Selection */}
      <Box sx={{ mt: 2, p: 1, borderRadius: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {crustTypes.map((type, index) => (
            <Button
              key={index}
              variant={activeType === index ? "contained" : "outlined"}
              size="small"
              onClick={() => setActiveType(index)}
              sx={{
                border: "none",
                color: activeType === index ? "white" : "black",
                bgcolor: activeType === index ? "orange" : "transparent",
                "&:hover": { bgcolor: activeType === index ? "darkorange" : "#ddd" },
              }}
            >
              {type}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1 }}>
          {sizes.map((size, index) => (
            <Button
              key={index}
              variant={activeSize === index ? "contained" : "outlined"}
              size="small"
              onClick={() => setActiveSize(index)}
              sx={{
                border: "none",
                color: activeSize === index ? "white" : "black",
                bgcolor: activeSize === index ? "orange" : "transparent",
                "&:hover": { bgcolor: activeSize === index ? "darkorange" : "#ddd" },
              }}
            >
              {size} cm
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
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          from {price} <EuroIcon fontSize="small" />
        </Typography>
        <Button
          variant="contained"
          onClick={() => setAddedCount((prev) => prev + 1)}
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
