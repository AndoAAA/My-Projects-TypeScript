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
        gap={2}
        p={1}
        sx={{ borderRadius: "30px", bgcolor: "#f5f5f5" }}
      >
        {categories.map((category, i) => (
          <Button
            key={i}
            variant={value === i ? "contained" : "outlined"}
            onClick={() => onChangeCategory(i)}
            aria-pressed={value === i}
            sx={{
              borderRadius: "20px",
              bgcolor: value === i ? "orange" : "transparent",
              color: value === i ? "white" : "black",
              border: "none",
              transition: "0.3s",
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
