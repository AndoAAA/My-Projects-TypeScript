import { Box, Button } from "@mui/material";
import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        p={1}
        sx={{
          borderRadius: "30px",
          bgcolor: "#f5f5f5",
          flexDirection: { xs: "column", sm: "row" }, // Stack vertically on mobile
          alignItems: "center", // Center buttons on mobile
        }}
      >
        {categories.map((category, i) => (
          <Button
            key={i}
            variant={value === i ? "contained" : "outlined"}
            onClick={() => onChangeCategory(i)}
            aria-pressed={value === i}
            aria-label={`Category: ${category}`}
            sx={{
              borderRadius: "20px",
              bgcolor: value === i ? "orange" : "transparent",
              color: value === i ? "white" : "black",
              border: "none",
              transition: "0.3s",
              fontSize: { xs: "12px", sm: "14px" }, // Adjust font size for small screens
              padding: { xs: "6px 12px", sm: "8px 16px" }, // Adjust padding for mobile
              "&:hover": { bgcolor: "orange", color: "white" },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
